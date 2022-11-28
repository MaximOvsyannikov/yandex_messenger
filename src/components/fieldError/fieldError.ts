import Block from '../../utils/Block';
import './fieldError.scss';

export interface FieldErrorProps {
  isValid: boolean;
  text: string;
}

export class FieldError extends Block {
  constructor(props: FieldErrorProps) {
    super(props);
  }

  render() {
    if (this.props.isValid) {
      return '<div></div>';
    }

    return `<p class="fieldError">{{ text }}</p>`;
  }
}
