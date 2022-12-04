import Block from '../../utils/Block';
import './signin.scss';

export class SigninPage extends Block {
  constructor() {
    super();
  }
  render() {
    return `
    <main class="signin__root">
      <div class="signin__card">
        <h1 class="signin__title">Вход</h1>
        {{#Form class="signin__form"}}
          <div class="signin__form-input-container">
            {{{InputField type="text" name="login" value="" placeholder="login" validation="login" }}}
            {{{InputField type="password" name="password" placeholder="password" value=""  validation="password" }}}
          </div>
          <div>
            {{{Button type="submit" variant="primary" label="Авторизоваться"}}}
            {{{Button variant="secondary" label="Нет аккаунта?"}}}
          </div>
        {{/Form}}
      </div>
    </main>
  `;
  }
}
