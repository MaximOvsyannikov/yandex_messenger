import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { formatDate } from '../../utils/helpers';
import { withStore } from '../../utils/Store';
import './chat.scss';

export class ChatPageBase extends Block {
  constructor() {
    super();
    ChatsController.fetchChats();
  }

  render() {
    return `
            <main class="chat__root">
              <div class="chat__chat-list-container">
                {{{ProfileLink }}}
                {{{ChatSearchInput placeholder="🔍 Поиск" value=""}}}
                {{#each chats}}
                  {{{ChatItem avatar=avatar
                    id=id
                    title=title
                    last_message=last_message
                    time=time
                    unread_count=unread_count
                    selected=selectedChat
                    }}}
                {{/each}}
                <div class="chat__add-chat-button">
                  {{{AddChatButton show=false }}}
                </div>
              </div>
              {{#if selectedChat}}
                <div class="chat__message-list-container">
                  {{{ChatHeader name=name selectedChat=selectedChat}}}
                  {{{ChatMessageList messages=messages}}}
                  {{{ChatFooter selectedChat=selectedChat }}}
                </div>
              {{else}}
                {{{SelectChatDummy}}}
              {{/if}}
            </main>
  `;
  }
}

const withCharts = withStore((state) => ({
  chats: (state.chats || []).map((el) => ({
    ...el,
    last_message: el.last_message
      ? { ...el.last_message, time: formatDate(el.last_message.time) }
      : el.last_message,
    selectedChat: state.selectedChat,
  })),
  messages: state.selectedChat
    ? ((state.messages || {})[state.selectedChat] || []).map((el) => ({
        ...el,
        time: formatDate(el.time),
        isMine: el.user_id === state.user.id,
      }))
    : [],
  selectedChat: state.selectedChat,
  name:
    (state.chats || []).find((el) => el.id === state.selectedChat)?.title || '',
}));

export const ChatPage = withCharts(ChatPageBase);
