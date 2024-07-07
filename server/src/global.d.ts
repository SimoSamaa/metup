namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_DB: string;
    TOKEN_SECRET: string;
    LOCALHOST: string;
    CLIENT_URL: string;
    EMAIL: string;
    MAILING_ID: string;
    MAILING_SECRET: string;
    MAILING_REFRESH: string;
    MAILING_ACCESS: string;
    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;
  }
}