import MessagesController from '../../controllers/MessagesController';
import Block from '../../utils/Block';
import './chatFooter.scss';

interface Props {
  selectedChat?: number;
}
export class ChatFooter extends Block {
  constructor(props: Props) {
    super({
      ...props,
      disableButton: !props.selectedChat,
      onClick: () => {
        const input = this.refs.messageInput;
        const message = (input.element as HTMLInputElement).value;
        if (!message) return;
        input.setProps({ value: '' });
        MessagesController.sendMessage(this.props.selectedChat!, message);
      },
    });
  }

  render() {
    return `
            <div class="chatFooter__root">
              {{{MessageInput placeholder="Сообщение" ref="messageInput"}}}
              <div>
                {{{Button disabled=disableButton variant="primary" label="➤" class="chatFooter__send-button" onClick=onClick}}}
              </div>
            </div>
  `;
  }
}
