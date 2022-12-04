import Block from '../../utils/Block';
import './main.scss';

interface Props {
  pages: {
    label: string;
    onClick: () => void;
  }[];
}

export class MainPage extends Block {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return `
            <main class="main__root">
              {{#each pages}}
                {{{Button label=label onClick=onClick  variant="primary" }}}
              {{/each}}
            </main>
  `;
  }
}
