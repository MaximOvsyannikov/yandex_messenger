import Block from '../../utils/Block';
import './profile.scss';

interface Props {
  view: 'info' | 'password' | 'update';
}

export class ProfilePage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      changeProfileData: () => {
        this.setProps({ view: 'update' });
      },
      changePassword: () => {
        this.setProps({ view: 'password' });
      },
    });
  }
  render() {
    return `
            <main class="profile__root">
              <div class="profile__card">
                {{{Avatar}}}
                {{#if (eq view "info")}}
                  <p class="profile__title">Иван</p>
                {{/if}}
                {{#Form class="profile__form"}}
                  <div class="profile__form-input-container">
                    {{#if (noteq view "password")}}
                      {{{ProfileField type="text" name="email" label="Почта" value="pochta@yandex.ru" underline="true" validation="email" }}}
                      {{{ProfileField type="text" name="login" label="Логин" value="ivanivanov" underline="true" validation="login" }}}
                      {{{ProfileField type="text" name="first_name" label="Имя" value="Иван" underline="true" validation="name" }}}
                      {{{ProfileField type="text" name="second_name" label="Фамилия" value="Иванов" underline="true" validation="name" }}}
                      {{{ProfileField type="text" name="display_name" label="Имя в чате" value="Иван" underline="true" validation="name" }}}
                      {{{ProfileField type="text" name="phone" label="Телефон" value="+7 (909) 967 30 30" validation="phone" }}}
                    {{/if}}
                    {{#if (eq view "password")}}
                      {{{ProfileField type="password" name="password_old" label="Старый пароль" value="pochta@yandex.ru" underline="true" validation="password" }}}
                      {{{ProfileField type="password" name="password" label="Новый пароль" value="ivanivanov" underline="true" validation="password" }}}
                      {{{ProfileField type="password" name="password_confirm" label="Повторите новый пароль" value="Иван" validation="password_confirm" }}}
                    {{/if}}
                  </div>
                  {{#if (eq view "info")}}
                      {{{ProfileButton type="button" underline="true" label="Изменить данные" onClick=changeProfileData }}}
                      {{{ProfileButton type="button" underline="true" label="Изменить пароль" onClick=changePassword }}}
                      {{{ProfileButton type="button" label="Выйти" style="color: var(--error-color)"}}}
                  {{/if}}
                  {{#if (noteq view "info")}}
                    <div class="profile__form-button-container">
                      {{{Button type="submit" variant="primary" label="Сохранить" style="width: 280px"}}}
                    </div>
                  {{/if}}
                  </div>
                {{/Form}}
              </div>
            </main>
  `;
  }
}
