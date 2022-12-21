import Block from '../../utils/Block';
import './fileField.scss';

interface InputFieldProps {
  name: string;
}

export class FileField extends Block {
  constructor({ ...props }: InputFieldProps) {
    super({
      ...props,
      onChange: (e: any) => {
        if (!e.target.files[0]) return;
        this.setProps({ fileName: e.target.files[0].name });
        this.setProps({ file: e.target.files[0] });
      },
    });
  }

  render() {
    return `<div class="fileField__root">
              <label>
                {{{FileFieldInput name=name onChange=onChange}}}
                {{#if fileName}}
                  <p class="fileField__file-name">{{fileName}}</p>
                {{else}}
                  <p class="fileField__label">Выберите файл на компьютере</p>
                {{/if}}
              </label>
            </div>
      `;
  }
}
