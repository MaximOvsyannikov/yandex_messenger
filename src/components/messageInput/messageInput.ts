import Block from '../../utils/Block';
import './messageInput.scss';

export interface MessageInputProps {
  name: string;
  value: string;
  placeholder: string;
}

export class MessageInput extends Block {
  constructor(props: MessageInputProps) {
    super(props);
  }

  render() {
    return `
            <input
              type="text"
              class="messageInput"
              name="{{name}}"
              value="{{value}}"
              placeholder="{{placeholder}}"
            />
  `;
  }
}
