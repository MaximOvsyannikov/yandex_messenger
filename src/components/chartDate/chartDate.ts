import Block from '../../utils/Block';
import './chartDate.scss';

export interface ChartDateProps {
  text: string;
}

export class ChartDate extends Block {
  constructor(props: ChartDateProps) {
    super(props);
  }

  render() {
    return `
            <div class='chartDate__root'>
              <p class='chartDate__text'>{{text}}</p>
            </div>
  `;
  }
}
