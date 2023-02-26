declare global {
  namespace NodeJs {
    interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}

export {};
