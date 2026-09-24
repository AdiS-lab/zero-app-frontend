interface IConfig {
  vapidPublicKey: string;
  baseUrl: string;
  serverUrl: string;
}

const config: IConfig = {
  vapidPublicKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
  baseUrl: import.meta.env.VITE_BASE_URL,
  serverUrl:
    import.meta.env.VITE_APP_MODE === "DEV"
      ? import.meta.env.DEV_SERVER_URL
      : import.meta.env.PROD_SERVER_URL,
};

export default config;
