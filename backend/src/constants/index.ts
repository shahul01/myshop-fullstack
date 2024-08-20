


export const urlFrontend = process.env.URL_FRONTEND || 'http://localhost:3000';
export const port = Number(process.env.PORT || 8000);

export const sessionSecret = process.env.SESSION_SECRET || 'secret';

export const pgUsername = process.env.POSTGRES_USERNAME || 'postgres';
export const pgHost = process.env.POSTGRES_HOST || 'localhost';
export const pgDatabase = process.env.POSTGRES_DATABASE || 'myshop_fullstack_db';
export const pgPassword = process.env.POSTGRES_PASSWORD || 'postgres';
export const pgPort:number = Number(process.env.POSTGRES_PORT) || 5432;

export const tokenName = process.env.AUTH_TOKEN_NAME || 'auth_token';
export const authTokenSecret = process.env.AUTH_TOKEN_SECRET || 'secret';
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refreshsecret';
