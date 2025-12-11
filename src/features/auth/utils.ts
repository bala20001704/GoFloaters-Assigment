export const authStorage = {
  getToken: (name: string): string | null => {
    return localStorage.getItem(name);
  },

  setToken: (name: string, token: string): void => {
    localStorage.setItem(name, token);
  },

  clear: (accessTokenName: string, refreshTokenName: string): void => {
    localStorage.removeItem(accessTokenName);
    localStorage.removeItem(refreshTokenName);
  },
};
