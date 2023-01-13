import Block from '../../utils/Block';
import './error.scss';

interface Props {
  title: string;
  text: string;
}

export class ErrorPage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return `
        <main class="error__root">
          <div class="error__card">
            <h1 class="error__title">{{title}}</h1>
            <p class="error__text">{{text}}</p>
            {{{Link to="/messenger" label="Назад к чатам"}}}
          </div>
        </main>
  `;
  }
}
