import Block from '../../utils/Block';
import './message.scss';

export interface MessageProps {
  my: boolean;
  readed: boolean;
  time: string;
  text: string;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return `
            <div class='message__root {{#if my}} message__root-my {{/if}}'>
              <div class='message__cloud {{#if my}} message__cloud-my {{/if}}'>
                <p class='message__text'>{{text}}<span class='message__time-place'></span></p>
                
                <p class='message__time {{#if readed}} message__time-readed {{/if}}'>
                  {{#if readed}}
                    <img
                      alt="done"
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAATCAYAAAATSBSOAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFMSURBVHgB5dVBTsJAFAbgNxQWLoh4g97ACcTEpdzAG+jGBOvGG1hu4Eq70xtwBF26MMgRegMT20SF0Oc8oQm0M8w08GDB383LZDrz5SUzA7DvObvFVuc6GZz2vn3b3JOrVLaD5I5qAcwhWPKbvqryWG0XN9DrvkUHMRhgWR1fVNlCASErbhmWRw9chOVjNWCKHjbLj/psMApL58wwEU9x0h1FR7EVhtDXdk4GqYQdw96jZljCdW7SCw/xIz8xXDA6uVkdBiYY1bUiDDJ8nk8KqwKrwCZiqjqGvglWwkEGYWGyM7AdfD1tElbC0UK0YFUgwQSKy03C/seLA7L36XuiUVqALsXhQ7O/LZgWVwXICTPiXIDcsJW4VUD11wgQJCdsto0lRiAzzAlnB/LAKE4PP22su2Z0MMpYjM/XhTnj9EA9jDJ8PLwnzDowyh+1H3NKPtBfnQAAAABJRU5ErkJggg=='
                      width="9"
                      height="5"
                    /> 
                  {{/if}}
                  {{time}}
                </p>
              </div>
            </div>
  `;
  }
}
