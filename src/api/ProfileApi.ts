import BaseAPI from './BaseApi';

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface FullUserData extends UserData {
  id: number;
  avatar: string;
}

export interface ChangePassswordData {
  oldPassword: string;
  newPassword: string;
}

export interface SearchUserData {
  login: string;
}

export class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateUser(data: UserData): Promise<FullUserData> {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: FormData): Promise<FullUserData> {
    return this.http.put('/profile/avatar', data);
  }

  changePassword(data: ChangePassswordData) {
    return this.http.put('/password', data);
  }

  read(id: string): Promise<FullUserData> {
    return this.http.get(`/${id}`);
  }

  searchUser(data: SearchUserData): Promise<FullUserData[]> {
    return this.http.post('/search', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ProfileAPI();
