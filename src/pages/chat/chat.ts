import Block from '../../utils/Block';
import './chat.scss';

export class ChatPage extends Block {
  constructor() {
    super();
  }

  render() {
    return `
            <main class="chat__root">
              <div class="chat__chat-list-container">
                {{{ProfileLink }}}
                {{{ChatSearchInput placeholder="🔍 Поиск" value=""}}}
                {{{ChatItem name="Андрей" message="Небольшое" count="2" time="23:55"}}}
                {{{ChatItem name="Андрей" message="Средней длинны средней длинны" count="12332" time="23:55"}}}
                {{{ChatItem name="Саша" message="ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ" count="0" time="07:00"}}}
                {{{ChatItem name="ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ" message="ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ" time="10:45"}}}
              </div>
              <div class="chat__message-list-container">
                {{{ChatHeader name="Sanya"}}}
                {{{ChatMessageList}}}
                {{{ChatFooter}}}
              </div>
            </main>
  `;
  }
}
