import { ChangePassswordData, UserData } from '../../api/ProfileApi';
import AuthController from '../../controllers/AuthController';
import ProfileController from '../../controllers/ProfileController';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import { withStore } from '../../utils/Store';
import './profile.scss';

interface Props {
  view?: 'info' | 'password' | 'update';
}

class ProfilePageBase extends Block {
  constructor(props: Props = {}) {
    super({
      ...props,
      view: props.view || 'info',
      changeProfileData: () => {
        Router.go('/settings/update');
      },
      changePassword: () => {
        Router.go('/settings/password');
      },
      logout: () => {
        AuthController.logout();
      },
      onSubmit: (data: UserData | ChangePassswordData) => {
        if ('newPassword' in data) {
          ProfileController.changePassword(data as ChangePassswordData)
            .then(() => {
              Router.go('/settings');
            })
            .catch((err) => {
              console.log({ err });
              this.refs.errorText.setProps({
                isValid: false,
                text: err.reason || 'Ошибка смены пароля',
              });
            });
        } else {
          ProfileController.updateUser(data as UserData)
            .then(() => {
              Router.go('/settings');
            })
            .catch((err) => {
              console.log({ err });
              this.refs.errorText.setProps({
                isValid: false,
                text: err.reason || 'Ошибка обновления',
              });
            });
        }
      },
    });

    AuthController.fetchUser();
  }

  render() {
    const disabledField = !this.props.view || this.props.view === 'info';
    return `
            <main class="profile__root">
              {{{ProfileGoBack}}}
              <div class="profile__card-container">
                <div class="profile__card">
                  {{{Avatar img=user.avatar show=false}}}
                  {{#if (eq view "info")}}
                    <p class="profile__title">{{user.first_name}}</p>
                  {{/if}}
                  {{#Form class="profile__form" onSubmit=onSubmit}}
                    <div class="profile__form-input-container">
                      {{#if (noteq view "password")}}
                        {{{ProfileField disabled=${disabledField} type="text" name="email" label="Почта" value=user.email underline="true" validation="email" }}}
                        {{{ProfileField disabled=${disabledField} type="text" name="login" label="Логин" value=user.login underline="true" validation="login" }}}
                        {{{ProfileField disabled=${disabledField} type="text" name="first_name" label="Имя" value=user.first_name underline="true" validation="name" }}}
                        {{{ProfileField disabled=${disabledField} type="text" name="second_name" label="Фамилия" value=user.second_name underline="true" validation="name" }}}
                        {{{ProfileField disabled=${disabledField} type="text" name="display_name" label="Имя в чате" value=user.display_name underline="true" validation="name" }}}
                        {{{ProfileField disabled=${disabledField} type="text" name="phone" label="Телефон" value=user.phone validation="phone" }}}
                      {{/if}}
                      {{#if (eq view "password")}}
                        {{{ProfileField type="password" name="oldPassword" label="Старый пароль" underline="true" validation="password" }}}
                        {{{ProfileField type="password" name="newPassword" label="Новый пароль" underline="true" validation="password" }}}
                        {{{ProfileField type="password" name="confirmPassword" label="Повторите новый пароль" validation="password_confirm" }}}
                      {{/if}}
                    </div>
                    {{#if (eq view "info")}}
                        {{{ProfileButton type="button" underline="true" label="Изменить данные" onClick=changeProfileData }}}
                        {{{ProfileButton type="button" underline="true" label="Изменить пароль" onClick=changePassword }}}
                        {{{ProfileButton type="button" onClick=logout label="Выйти" style="color: var(--error-color)"}}}
                    {{/if}}
                    {{#if (noteq view "info")}}
                      <div>
                        <p>
                          {{{FieldError text="" isValid=true ref="errorText"}}}
                        </p>
                        <div class="profile__form-button-container">
                          {{{Button type="submit" variant="primary" label="Сохранить" style="width: 280px"}}}
                        </div>
                      </div>
                    {{/if}}
                    </div>
                  {{/Form}}
                </div>
              </div>
            </main>
  `;
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const ProfilePage = withUser(ProfilePageBase);
