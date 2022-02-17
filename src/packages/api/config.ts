interface Config {
  token: string | null;
}

export const config: Config = {
  token: null,
};

export const setToken = (newToken: string): string => (config.token = newToken);
