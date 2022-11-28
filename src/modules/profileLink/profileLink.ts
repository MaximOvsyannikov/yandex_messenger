import Block from '../../utils/Block';
import './profileLink.scss';

export class ProfileLink extends Block {
  constructor() {
    super();
  }

  render() {
    return `
            <div class='profileLink__root'>
              <a class='profileLink__link'>Профиль ></a>
            </div>
  `;
  }
}
