import Block from '../../utils/Block';
import './profileButton.scss';

export interface ProfileButtonProps {
  type: string;
  style: string;
  label: string;
  underline: boolean;
  onClick?: () => void;
}

export class ProfileButton extends Block {
  constructor({ onClick, ...props }: ProfileButtonProps) {
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
                class="profileButton {{#if underline}} profileButton__underline {{/if}}"
                {{#if style}} style="{{style}}" {{/if}}
              >
                {{label}}
              </button>
  `;
  }
}
