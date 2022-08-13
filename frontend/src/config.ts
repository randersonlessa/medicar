export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const STORAGE_KEY = 'MEDICAR_STORAGE_KEY';

export const STORAGE_KEYS = {
  AUTH: `${STORAGE_KEY}_AUTH`,
  USER: `${STORAGE_KEY}_USER`,
  CONFIG: `${STORAGE_KEY}_CONFIG`,
};
