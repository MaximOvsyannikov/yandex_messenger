import Block from '../../utils/Block';
import './input.scss';

export interface InputProps {
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class Input extends Block {
  constructor({ onFocus, onBlur, onChange, ...props }: InputProps) {
    super({
      ...props,
      events: {
        focus: onFocus,
        blur: onBlur,
        change: onChange,
      },
    });
  }

  render() {
    return `
      <input
        type="{{type}}"
        class="input"
        name="{{name}}"
        value="{{value}}"
        placeholder="{{placeholder}}"
      />
  `;
  }
}
