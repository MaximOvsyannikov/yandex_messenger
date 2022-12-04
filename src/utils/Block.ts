import EventBus from './EventBus';
import { v4 } from 'uuid';
import Handlebars from 'handlebars';

type BlockEvents<P> = {
  init: [];
  'flow:component-did-mount': [];
  'flow:component-did-update': [P, P];
  'flow:render': [];
};

type Props<P extends Record<string, unknown> = any> = {
  events: Record<string, () => void>;
} & P;

class Block<P extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = v4();

  private _element: HTMLElement | null = null;
  private _meta: { props: any };

  protected props: Props<P>;
  protected children: Record<string, Block>;
  private eventBus: () => EventBus<BlockEvents<Props<P>>>;

  protected refs: Record<string, Block> = {};

  public static componentName?: string;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsAndChildren: Props<P> = {} as Props<P>) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this.props = this._makePropsProxy(props) as Props<P>;
    this._meta = {
      props,
    };
    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: Props<P>): {
    props: Props<P>;
    children: Record<string, Block>;
  } {
    const children: Record<string, Block> = {};
    const props = {} as Record<string, unknown>;

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected initChildren() {}

  _registerEvents(eventBus: EventBus<BlockEvents<Props<P>>>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: Props<P>, _newProps: Props<P>) {
    return true;
  }

  setProps = (nextProps: Partial<Props<P>>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const templateString = this.render();

    const fragment = this.compile(templateString, { ...this.props });

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props<P>) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: unknown) {
        const oldProps = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self
          .eventBus()
          .emit(
            Block.EVENTS.FLOW_CDU,
            oldProps as Props<P>,
            target as Props<P>
          );

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    if (!this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events = {} } = this.props;

    if (!this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement;

    const template = Handlebars.compile(templateString);

    const htmlString = template({
      ...context,
      children: this.children,
      refs: this.refs,
    });

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(
        `[data-id="id-${child.id as string}"]`
      );

      if (!stub) {
        return;
      }

      const content = child.getContent()!;

      stub.replaceWith(content);

      if (stub.childNodes.length) {
        content.append(...stub.childNodes);
      }
    });

    return fragment.content;
  }
}

export default Block;
