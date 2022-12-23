import { SignupData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import './signup.scss';

export class SignupPage extends Block {
  constructor() {
    super({
      onSubmit: (data: SignupData) => {
        AuthController.signup(data).catch((err) => {
          console.log({ err });
          this.refs.errorText.setProps({
            isValid: false,
            text: err.reason || 'Ошибка регистрации',
          });
        });
      },
      toLiginPage: () => {
        Router.go('/');
      },
    });
  }
  render() {
    return `
            <main class="signup__root">
              <div class="signup__card">
                <h1 class="signup__title">Регистрация</h1>
                {{#Form class="signup__form" onSubmit=onSubmit}}
                  <div class="signup__form-input-container">
                    {{{InputField type="text" name="email" placeholder="Почта" value="" validation="email" }}}
                    {{{InputField type="text" name="login" placeholder="Логин" value="" validation="login" }}}
                    {{{InputField type="text" name="first_name" placeholder="Имя" value="" validation="name" }}}
                    {{{InputField type="text" name="second_name" placeholder="Фамилия" value="" validation="name" }}}
                    {{{InputField type="text" name="phone" placeholder="Телефон" value="" validation="phone" }}}
                    {{{InputField type="password" name="password" placeholder="Пароль" value="" validation="password" }}}
                    {{{InputField type="password" name="password_confirm" placeholder="Пароль (еще раз)" value="" validation="password_confirm" }}}
                  </div>
                  <div>
                    <p>
                      {{{FieldError text="" isValid=true ref="errorText"}}}
                    </p>
                    {{{Button type="submit" variant="primary" label="Зарегистрироваться"}}}
                    {{{Button variant="secondary" label="Войти" onClick=toLiginPage}}}
                  </div>
                {{/Form}}
              </div>
            </main>
  `;
  }
}
