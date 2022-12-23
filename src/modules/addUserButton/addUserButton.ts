import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';

interface Props {
  selectedChat: number;
}

export class AddUserButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
      openDialog: (event: MouseEvent) => {
        event.stopPropagation();
        this.setProps({ show: true });
      },
      hideDialog: () => {
        this.setProps({ show: false });
      },
      onSubmit: (data: { userId: number }) => {
        const { userId } = data;
        if (userId) {
          ChatsController.addUserToChat(props.selectedChat, userId);
        }
      },
    });
  }

  render() {
    return `
          <div>
            {{{Button
              variant="secondary"
              onClick=openDialog
              label="Добавить пользователя"
            }}}
            {{#if show}}
              {{#DialogBackdrop show=false onClick=hideDialog}}
                {{#Dialog}}
                  {{{OneFieldForm title="Добавить пользователя" fieldName="userId" fieldPlaceholder="ID пользователя" buttonLabel="Добавить" onSubmit=onSubmit }}}
                {{/Dialog}}
              {{/DialogBackdrop}} 
            {{/if}}
          </div> 
            
  `;
  }
}
