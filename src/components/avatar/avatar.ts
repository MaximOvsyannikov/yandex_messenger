import ProfileController from '../../controllers/ProfileController';
import Block from '../../utils/Block';
import './avatar.scss';

export interface AvatarProps {
  name: string;
  label: string;
  class?: string;
  style?: string;
  show: boolean;
  img: string;
}

export class Avatar extends Block {
  constructor({ ...props }: AvatarProps) {
    super({
      ...props,
      openDialog: (event: MouseEvent) => {
        event.stopPropagation();
        this.setProps({ show: true });
      },
      hideDialog: () => {
        this.setProps({ show: false });
      },
      onSubmit: () => {
        const file = this.refs.fileInput.props.file;

        if (!file) {
          this.refs.errorText.setProps({
            isValid: false,
            text: 'Нужно выбрать файл',
          });
          return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        ProfileController.updateAvatar(formData).catch((err) => {
          this.refs.errorText.setProps({
            isValid: false,
            text: err.reason || 'Ошибка сохранения файла',
          });
        });
      },
    });
  }

  render() {
    return `
          <div>
            {{{AvatarButton img=img onClick=openDialog}}}
            {{#if show}}
              {{#DialogBackdrop show=false onClick=hideDialog}}
                {{#Dialog}}
                  <div class="avatar__form-card">
                    <h1 class="avatar__form-title">Загрузите файл</h1>
                    {{#Form class="avatar__form" onSubmit=onSubmit}}
                      <div class="avatar__form-input-container">
                        {{{FileField name='file' ref="fileInput" }}}
                      </div>
                      <div>
                        <p>
                          {{{FieldError text="" isValid=true ref="errorText"}}}
                        </p>
                        {{{Button type="submit" variant="primary" label="Поменять"}}}
                      </div>
                    {{/Form}}
                  </div>
                {{/Dialog}}
              {{/DialogBackdrop}} 
            {{/if}}
          </div>
  `;
  }
}
