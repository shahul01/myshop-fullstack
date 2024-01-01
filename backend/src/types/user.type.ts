
// data from register form in frontend

type RegisterUser = {
  fullname: string;
  username: string;
  email: string;
  authMethod: string;
};

export type RegisterUserRawPass = RegisterUser & {
  rawPassword: string;
};

export type RegisterUserHashedPass = RegisterUser & {
  password: string;
};

// register user but without authMethod
export type ResRegisterUser = RegisterUser & {
  id: string;
};

export type User = RegisterUser &
{
  id: string;
  auth_method: string;
  google_id?: string
  full_address: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code: number;
  phone_number: string;
};
