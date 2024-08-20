
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

// register user
// TODO: omit authmethod
export type ResRegisterUser = RegisterUser & {
  id: string;
};

export type User = RegisterUserHashedPass &
{
  id: string;
  auth_method: string;
  google_id?: string
  house_no_and_street_name?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code: number;
  phone_number: string;
};

export type SomeUserColumnsWithoutPass = Partial<Array<
  keyof Omit<User, 'password'>
>>;

export type SomeUserColumns = Partial<Array<keyof User>>;
