import Block from '../../utils/Block';
import './profileInput.scss';

export interface ProfileInputProps {
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class ProfileInput extends Block {
  constructor({ onFocus, onBlur, onChange, ...props }: ProfileInputProps) {
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
        class="profileInput"
        name="{{name}}"
        value="{{value}}"
        placeholder="{{placeholder}}"
      />
  `;
  }
}
