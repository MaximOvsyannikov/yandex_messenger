import Block from '../../utils/Block';
import Router from '../../utils/Router';
import './profileLink.scss';

export class ProfileLink extends Block {
  constructor() {
    super({
      router: Router,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go('/settings');
  }
  render() {
    return `
            <div class='profileLink__root'>
              <a class='profileLink__link'>Профиль ></a>
            </div>
  `;
  }
}
