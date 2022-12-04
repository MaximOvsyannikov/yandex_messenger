import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

export function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(
    Component.name,
    function ({ hash, data, fn }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children } = data.root;

      const component = new Component(hash);

      if (hash.ref) {
        data.root.refs[hash.ref] = component;
      }

      children[component.id] = component;

      // @ts-ignore
      const contents = fn ? fn(this) : '';

      return `<div data-id="id-${component.id}">${contents}</div>`;
    }
  );
}
