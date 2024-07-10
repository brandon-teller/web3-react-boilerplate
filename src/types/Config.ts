export interface Env {
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
}

export interface Constants {
  // ...
}

export interface Config extends Env, Constants {}
