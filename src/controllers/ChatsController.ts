import API, { ChatsAPI } from '../api/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';

export interface CreateChartFormData {
  title: string;
}

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(data: CreateChartFormData) {
    const { id: chatId } = await this.api.create(data);
    this.fetchChats().then(() => {
      this.selectChat(chatId);
    });
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  deleteUserFromChat(id: number, userId: number) {
    this.api.deleteUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

export default new ChatsController();
