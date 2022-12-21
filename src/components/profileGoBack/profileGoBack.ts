import Block from '../../utils/Block';
import Router from '../../utils/Router';
import './profileGoBack.scss';

export class ProfileGoBack extends Block {
  constructor() {
    super({
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    Router.back();
  }

  render() {
    return `
            <div class="profileGoBack">
              <img
                alt="back"
                src="data:image/png;base64,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"
                width="28"
                height="28"
              />
            </div>     
  `;
  }
}
