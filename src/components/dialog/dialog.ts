import Block from '../../utils/Block';
import './dialog.scss';

export class Dialog extends Block {
  constructor() {
    super({
      events: {
        click: (e: MouseEvent) => {
          e.stopPropagation();
        },
      },
    });
  }

  render() {
    return `
              <div class="dialog">
              </div>   
  `;
  }
}
