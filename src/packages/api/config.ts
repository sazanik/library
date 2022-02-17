interface Config {
  token: string | null;
}

export const config: Config = {
  token: null,
};

export const setToken = (newToken: string): void => {
  config.token = newToken;
};

export const clearToken = (): void => {
  config.token = null;
};
