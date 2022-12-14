import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import './chatItem.scss';

export interface ChatItemProps {
  avatar: string;
  id: number;
  title: string;
  last_message: {
    content: string;
    id: number;
    time: string;
  };
  time: string;
  unread_count: number;
  selected: number;
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      isSelected: props.selected === props.id,
      events: {
        click: () => {
          ChatsController.selectChat(props.id);
        },
      },
    });
  }

  render() {
    return `
            <div class='chatItem__root  {{#if isSelected}} chatItem__root-selected {{/if}}'>
              <div class='chatItem__container'>
                <div class='chatItem__avatar-container'>
                  <div class='chatItem__avatar'>
                    <img
                      alt='avatar'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHiSURBVHgB7ZhbboJAFIYPaOIrO6hdgRAviU9lB3UHbXdAV1DdQbsC7Q50B/iqMdAdsINOX73R/7TYoEnBdMwwTeZLJsBw+zhzxyIQRVEzTdMxkotDh6pnul6vH/v9fmKx3H6/j0gPsTwCkl59t9s9W5blIHqvtVot8DxPUIVwwOA0hNNdo9EYW6vVKuUTsL3mkJIGQNJBqb5jV9iHTF3kmFwpOjZpjvaC9XMuQj0NsLnJDmftdntCiigVhFyMTSuXNUAlvkI9GZECCosYcvd0LPcFWthwuVz6pIBCQe6LCk77pIBCQUTqgyqmLILT385tt9sJKaBQkFsrhsCX03xEdqSqYy9txZ1OJ0CD4Ej6tm0LyMXdbjckRZzVD2ZCIVWAGepkMYKyGEFZzupm8iwWCxdrF5++JxG8bRZdj9EoRmefYHeOtUbY6/ViupQgrw0wpLnooF286PYvy9LsHk4DfBjPkARLQ3aOvLCs06+fCuFGHw/g1MKowaPH4UV0IXgFyc/1sf8EYY5yiLw3pBAfEeZXlj+rOpBQSXGpIqsWHPWjRtIkTTjIMaabkcUIymIEZTGCsvwLwUr/qJZh87hHmoIhb8aCD6RnFMVmswlsTG0STH082E5JDwRPu/gPP/+9+ARKDtlEuCVcWQAAAABJRU5ErkJggg=='
                      width='47'
                      height='47'
                    />
                  </div>
                </div>
                <div class='chatItem__info-container'>
                  <p class='chatItem__chat-name'>{{title}}</p>
                  <p class='chatItem__last-message'>
                    {{last_message.content}}
                  </p>
                </div>
                <div class='chatItem__time-container'>
                  <p class='chatItem__last-message-time'>{{last_message.time}}</p>
                  {{#if (noteq unread_count 0)}}
                    <p class='chatItem__last-message-count'>{{unread_count}}</p>
                  {{/if}}
                </div>
              </div>
            </div>
  `;
  }
}
