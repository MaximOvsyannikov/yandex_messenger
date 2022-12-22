import Block from '../../utils/Block';
import './button.scss';

export interface ButtonProps {
  type?: string;
  label: string;
  class?: string;
  style?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export class Button extends Block {
  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
            <button
              type="{{type}}"
              {{#if style}} style="{{style}}" {{/if}}
              class="button button-{{variant}} {{class}}"
              {{#if disabled}} disabled {{/if}}
            >
              {{label}}
            </button>
  `;
  }
}
