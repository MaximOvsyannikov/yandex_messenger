import ChatsController, {
  CreateChartFormData,
} from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import './addChatButton.scss';

export class AddChatButton extends Block {
  constructor() {
    super({
      openDialog: (event: MouseEvent) => {
        event.stopPropagation();
        this.setProps({ show: true });
      },
      hideDialog: () => {
        this.setProps({ show: false });
      },
      onSubmit: (data: CreateChartFormData) => {
        ChatsController.create(data).then(() => {
          this.setProps({ show: false });
        });
      },
    });
  }

  render() {
    return `
          <div>
            {{{Button
              variant="primary"
              class="addChatButton"
              onClick=openDialog
              label="＋"
            }}}
            {{#if show}}
              {{#DialogBackdrop show=false onClick=hideDialog}}
                {{#Dialog}}
                  {{{OneFieldForm title="Создать чат" fieldName="title" fieldPlaceholder="Название чата" buttonLabel="Создать" onSubmit=onSubmit }}}
                {{/Dialog}}
              {{/DialogBackdrop}} 
            {{/if}}
          </div> 
            
  `;
  }
}
