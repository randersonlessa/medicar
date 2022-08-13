import IUser from '../interfaces/User';
import { STORAGE_KEYS } from '../config';

class UserRepository {
  private local: Storage;

  constructor(local: Storage) {
    this.local = local;
  }

  setUser(user: IUser) {
    this.local.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser(): IUser {
    const user = this.local.getItem(STORAGE_KEYS.USER);
    return user !== null ? JSON.parse(user) : null;
  }

  removeUser() {
    this.local.removeItem(STORAGE_KEYS.USER);
  }
}

export default UserRepository;
