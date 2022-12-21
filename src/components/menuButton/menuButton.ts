import Block from '../../utils/Block';
import './menuButton.scss';

interface Props {
  show: boolean;
  selectedChat: number;
}

export class MenuButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        mouseleave: () => {
          this.setProps({ show: false });
        },
        click: (event: MouseEvent) => {
          event.stopPropagation();
          this.setProps({ show: true });
        },
      },
    });
  }

  render() {
    return `
            <div class="menuButton__root">
              <button
                type="button"
                class="menuButton__button"
              >
                <img
                  alt="menu"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABtSURBVHgB7VCxDYAwDGvpwhZ4IDMncBZs3ZiZEB/AJ9ySByAbI67UCVGJDYZaciI7UizZmARsGMw8YHXRW0SkdzAnCA+WkS0RWYvDDlHdPh1FKiMc5gd/daq64WcN0YAnOCLcm18id/Uen3Z1Aeq+MEhmGdbOAAAAAElFTkSuQmCC"
                  width="3"
                  height="15"
                />
              </button>
              {{#if show}}
                <div class="menuButton__dialog ">
                  {{{AddUserButton selectedChat=selectedChat}}}
                  {{{DeleteUserButton selectedChat=selectedChat}}}
                </div> 
              {{/if}}
            </div>
            
  `;
  }
}
// {{{UserMenuButton show=false label="Удалить пользователя"}}}
