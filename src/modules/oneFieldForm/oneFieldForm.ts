import Block from '../../utils/Block';
import './oneFieldForm.scss';

interface Props {
  title: string;
  fieldName: string;
  fieldPlaceholder: string;
  buttonLabel: string;
  onSubmit: () => void;
}

export class OneFieldForm extends Block {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return `
      <div class="oneFieldForm__card">
        <h1 class="oneFieldForm__title">{{title}}</h1>
        {{#Form class="oneFieldForm__form" onSubmit=onSubmit}}
          <div class="oneFieldForm__form-input-container">
            {{{InputField type="text" name=fieldName value="" placeholder=fieldPlaceholder validation="required" }}}
          </div>
          <div>
            {{{Button type="submit" variant="primary" label=buttonLabel}}}
          </div>
        {{/Form}}
      </div>
  `;
  }
}
