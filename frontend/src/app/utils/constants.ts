

export const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000';
export const tokenName = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || 'auth_token';
export const isDevelopment = process.env.NODE_ENV === "development";
