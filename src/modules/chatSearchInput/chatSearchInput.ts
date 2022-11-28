import Block from '../../utils/Block';
import './chatSearchInput.scss';

export interface ChatSearchInputProps {
  name: string;
  value: string;
  placeholder: string;
}

export class ChatSearchInput extends Block {
  constructor(props: ChatSearchInputProps) {
    super(props);
  }

  render() {
    return `
            <div class='chatSearchInput__root'>
              <input
                type='text'
                class='chatSearchInput__input'
                name='{{name}}'
                value='{{value}}'
                placeholder='{{placeholder}}'
              />
            </div>
  `;
  }
}
