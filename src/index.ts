import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';
import Block from './utils/Block';
import { registerHelpers } from './utils/helpers';
import { registerComponent } from './utils/RegisterComponent';

const PAGES = [
  {
    label: 'chat',
    onClick: () => {
      renderPage(new Pages.ChatPage.default());
    },
  },
  {
    label: 'signin',
    onClick: () => {
      renderPage(new Pages.SigninPage.default());
    },
  },
  {
    label: 'signup',
    onClick: () => {
      renderPage(new Pages.SignupPage.default());
    },
  },
  {
    label: '500',
    onClick: () => {
      renderPage(
        new Pages.ErrorPage.default({
          title: '500',
          text: 'Мы уже фиксим',
        })
      );
    },
  },
  {
    label: '400',
    onClick: () => {
      renderPage(
        new Pages.ErrorPage.default({
          title: '400',
          text: 'Не туда попали',
        })
      );
    },
  },
  {
    label: 'profile',
    onClick: () => {
      renderPage(new Pages.ProfilePage.default({ view: 'info' }));
    },
  },
];

document.addEventListener('DOMContentLoaded', () => {
  registerHelpers();
  Object.values({ ...Components, ...Modules }).forEach((Component) =>
    registerComponent(Component.default as typeof Block)
  );
  renderPage(new Pages.MainPage.default({ pages: PAGES }));
});

const renderPage = (page: Block) => {
  const root = document.querySelector('#app');
  root?.replaceChildren(page.getContent()!);
};
