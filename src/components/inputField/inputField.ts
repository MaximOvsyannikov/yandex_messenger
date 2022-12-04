import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import './inputField.scss';

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
  validation: ValidationType;
}

export class InputField extends Block {
  constructor({ onBlur, onFocus, validation, ...props }: InputFieldProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent) => {
        InputField.validate(
          event.target as HTMLInputElement,
          validation,
          this.refs.errorText
        );
        onBlur?.();
      },
      onFocus: (event: FocusEvent) => {
        InputField.validate(
          event.target as HTMLInputElement,
          validation,
          this.refs.errorText
        );
        onFocus?.();
      },
    });
  }

  static validate = (
    input: HTMLInputElement,
    validation: ValidationType,
    refs: Block
  ) => {
    const value = input.value;

    const formData = new FormData(input.form as HTMLFormElement | undefined);
    const [isValid, text] = Validator.validate(validation, value, formData);

    refs.setProps({
      isValid,
      text,
    });
  };

  render() {
    return `
          <div class="inputField__root">
              {{{Input type=type name=name placeholder=placeholder value=value onFocus=onFocus onBlur=onBlur onChange=onChange}}}
              <div class="inputField__error-container">
                {{{FieldError text="" isValid=true ref="errorText"}}}
              </div>
          </div>
      `;
  }
}
