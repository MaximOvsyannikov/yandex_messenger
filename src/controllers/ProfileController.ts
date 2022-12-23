import store from '../utils/Store';
import API, {
  ChangePassswordData,
  ProfileAPI,
  UserData,
} from '../api/ProfileApi';

export class ProfileController {
  private readonly api: ProfileAPI;

  constructor() {
    this.api = API;
  }

  async updateAvatar(data: FormData) {
    const user = await this.api.updateAvatar(data);
    store.set('user', user);
  }

  async updateUser(data: UserData) {
    const user = await this.api.updateUser(data);
    store.set('user', user);
  }

  async changePassword(data: ChangePassswordData) {
    await this.api.changePassword(data);
  }
}

export default new ProfileController();
