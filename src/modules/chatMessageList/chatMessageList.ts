import { Message } from '../../controllers/MessagesController';
import Block from '../../utils/Block';
import './chatMessageList.scss';

interface Props {
  messages: (Message & { isMine: boolean })[];
}

export class ChatMessageList extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return `
    <div class='chatMessageList__root'>
      {{#each messages}}
        {{{Message
          content=content
          isMine=isMine
          time=time
          type=type
          user_id=user_id
          readed="true"
        }}}
      {{/each}}
    </div>
  `;
  }
}
