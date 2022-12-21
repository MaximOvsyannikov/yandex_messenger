import { SigninData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import './signin.scss';

export class SigninPage extends Block {
  constructor() {
    super({
      onSubmit: (data: SigninData) => {
        AuthController.signin(data).catch((err) => {
          console.log({ err });
          this.refs.errorText.setProps({
            isValid: false,
            text: err.reason || 'Ошибка авторизации',
          });
        });
      },
    });
  }
  render() {
    return `
    <main class="signin__root">
      <div class="signin__card">
        <h1 class="signin__title">Вход</h1>
        {{#Form class="signin__form" onSubmit=onSubmit}}
          <div class="signin__form-input-container">
            {{{InputField type="text" name="login" value="" placeholder="login" validation="login" }}}
            {{{InputField type="password" name="password" placeholder="password" value=""  validation="password" }}}
            
          </div>
          <div>
            <p>
              {{{FieldError text="" isValid=true ref="errorText"}}}
            </p>
            {{{Button type="submit" variant="primary" label="Авторизоваться"}}}
            {{{Link to="/register" label="Нет аккаунта?"}}}
          </div>
        {{/Form}}
      </div>
    </main>
  `;
  }
}
