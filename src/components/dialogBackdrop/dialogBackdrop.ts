import Block from '../../utils/Block';
import './dialogBackdrop.scss';

interface Props {
  onClick: () => void;
}

export class DialogBackdrop extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.stopPropagation();
          props.onClick();
        },
        mouseleave: (event: MouseEvent) => {
          event.stopPropagation();
        },
      },
    });
  }

  render() {
    return `
            <div class="dialogBackdrop"></div> 
          `;
  }
}
