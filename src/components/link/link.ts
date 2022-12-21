import Block from '../../utils/Block';
import Router from '../../utils/Router';
import './link.scss';

interface Props {
  to: string;
  label: string;
  class?: string;
  style?: string;
}

export class Link extends Block {
  constructor({ ...props }: Props) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    Router.go(this.props.to);
  }

  render() {
    return `
            <span
              {{#if style}} style="{{style}}" {{/if}}
              class="linkComponent {{#if class}}{{class}}{{/if}}"
            >
              {{label}}
            </span>
  `;
  }
}
