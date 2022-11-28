import Block from '../../utils/Block';
import './chatFooter.scss';

export class ChatFooter extends Block {
  constructor() {
    super();
  }

  render() {
    return `
            <div class="chatFooter__root">
              {{{MessageInput placeholder="Сообщение"}}}
              <div>
                {{{Button variant="primary" label="➤" class="chatFooter__send-button"}}}
              </div>
            </div>
  `;
  }
}
