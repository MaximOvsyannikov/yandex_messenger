import Block from '../../utils/Block';
import { escape } from '../../utils/helpers';

export interface FormProps {
  class?: string;
  onSubmit?: (data: any) => void;
}

export class Form extends Block {
  constructor({ onSubmit, ...props }: FormProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          Array.from(form.getElementsByTagName('input')).forEach((el) => {
            el.focus();
            el.blur();
          });
          const formData = new FormData(form);
          const data: Record<string, any> = {};
          for (const pair of formData.entries()) {
            data[pair[0]] =
              typeof pair[1] === 'string' ? escape(pair[1]) : pair[1];
          }
          onSubmit?.(data);
        },
      },
    });
  }

  render() {
    return `
      <form class="{{class}}"></form>
  `;
  }
}
