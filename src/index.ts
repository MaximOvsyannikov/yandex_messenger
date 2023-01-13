import * as Components from './components';
import AuthController from './controllers/AuthController';
import * as Modules from './modules';
import * as Pages from './pages';
import Block from './utils/Block';
import { registerHelpers } from './utils/helpers';
import { registerComponent } from './utils/RegisterComponent';
import Router from './utils/Router';
import store, { StoreEvents } from './utils/Store';
import './index.scss';

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/settings',
  ProfilePassword = '/settings/password',
  ProfileUpdate = '/settings/update',
  Chat = '/messenger',
  Error404 = '/404',
  Error500 = '/500',
}

document.addEventListener('DOMContentLoaded', async () => {
  registerHelpers();
  Object.values({ ...Components, ...Modules }).forEach((Component) =>
    registerComponent(Component.default as typeof Block)
  );

  Router.use(Routes.Index, new Pages.SigninPage.default())
    .use(Routes.Register, new Pages.SignupPage.default())
    .use(Routes.Profile, new Pages.ProfilePage.default({}))
    .use(
      Routes.ProfilePassword,
      new Pages.ProfilePage.default({ view: 'password' })
    )
    .use(
      Routes.ProfileUpdate,
      new Pages.ProfilePage.default({ view: 'update' })
    )
    .use(Routes.Chat, new Pages.ChatPage.default({}))
    .use(
      Routes.Error404,
      new Pages.ErrorPage.default({ title: '404', text: 'Не туда попали' })
    )
    .use(
      Routes.Error500,
      new Pages.ErrorPage.default({ title: '500', text: 'Мы уже фиксим' })
    );

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    store.on(StoreEvents.Updated, () => {});
    await AuthController.fetchUser();
    Router.start();
    if (!isProtectedRoute) {
      Router.go(Routes.Chat);
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
