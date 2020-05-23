declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    APP_URL: string;
    MONGO_URL: string;
    STORAGE_TYPE: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
  }
}
