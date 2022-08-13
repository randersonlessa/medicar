import { STORAGE_KEYS } from '../config';

class ConfigRepository {
  private local = localStorage;

  setKeepSession(keepSession: boolean) {
    this.local.setItem(`${STORAGE_KEYS.CONFIG}_KEEP_SESSION`, JSON.stringify(keepSession));
  }

  getKeepSession(): boolean {
    const keep = this.local.getItem(`${STORAGE_KEYS.CONFIG}_KEEP_SESSION`);
    return keep !== null ? JSON.parse(keep) : null;
  }

  removeKeepSession() {
    this.local.removeItem(`${STORAGE_KEYS.CONFIG}_KEEP_SESSION`);
  }
}

export default ConfigRepository;
