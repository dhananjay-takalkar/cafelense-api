declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MONGO_URI: string;
      PORT: string;
      IMAGE_HIPPO_API_KEY: string;
      IMAGE_HIPPO_API_URL: string;
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}

export {};
