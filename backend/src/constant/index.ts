


export const urlFrontend = process.env.URL_FRONTEND || 'http://localhost:3000';
export const port = Number(process.env.PORT || 8000);

export const sessionSecret = process.env.SESSION_SECRET || 'secret';

export const password = process.env.POSTGRES_PASSWORD || 'postgres';

export const authTokenSecret = process.env.AUTH_TOKEN_SECRET || 'secret';
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refreshsecret';
