import { STORAGE_KEYS } from '../config';

class AuthRepository {
  private local: Storage;

  constructor(local: Storage) {
    this.local = local;
  }

  setToken(token: string) {
    this.local.setItem(STORAGE_KEYS.AUTH, JSON.stringify(token));
  }

  getToken(): string {
    const token = this.local.getItem(STORAGE_KEYS.AUTH);
    return token !== null ? JSON.parse(token) : null;
  }

  removeToken() {
    this.local.removeItem(STORAGE_KEYS.AUTH);
  }
}

export default AuthRepository;
