import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import './profileField.scss';

export interface ProfileFieldProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  label: string;
  underline: boolean;
  disabled?: boolean;
  validation: ValidationType;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class ProfileField extends Block {
  constructor({ onBlur, onFocus, validation, ...props }: ProfileFieldProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent) => {
        ProfileField.validate(
          event.target as HTMLInputElement,
          validation,
          this.refs.errorText
        );
        onBlur?.();
      },
      onFocus: (event: FocusEvent) => {
        ProfileField.validate(
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
          <div class="profileField__root">
            <div class="profileField__container {{#if underline}} profileField__underline {{/if}}">
              <span class="profileField__label">{{label}}</span>
              {{{ProfileInput type=type disabled=disabled name=name placeholder=placeholder value=value onFocus=onFocus onBlur=onBlur onChange=onChange}}}
              <div class="profileField__error-container">
                {{{FieldError text="" isValid=true ref="errorText"}}}
              </div>
            </div>
          </div>
  `;
  }
}
