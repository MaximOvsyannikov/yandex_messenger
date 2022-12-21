import Block from '../../utils/Block';
import './fileFieldInput.scss';

interface InputFieldProps {
  name: string;
  onChange: () => void;
}

export class FileFieldInput extends Block {
  constructor({ onChange, ...props }: InputFieldProps) {
    super({
      ...props,
      events: {
        change: onChange,
      },
    });
  }

  render() {
    return `
            <input class="fileFieldInput" type="file" name=name ></input>
      `;
  }
}
