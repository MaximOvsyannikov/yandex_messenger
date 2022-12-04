import Block from '../../utils/Block';
import './chatMessageList.scss';

export class ChatMessageList extends Block {
  constructor() {
    super();
  }

  render() {
    return `
    <div class='chatMessageList__root'>
      {{{Message text="jbvkjebvbbej" my="true" time="10:43" readed="true"}}}
      {{{ChartDate text="19 июня" }}}
      {{{Message text="jbvkjebvbbej" time="10:43"}}}
      {{{Message text="very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long " my="true" time="10:43" readed="true"}}}
    </div>
  `;
  }
}
