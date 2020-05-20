declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    MONGO_URL: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
  }
}
