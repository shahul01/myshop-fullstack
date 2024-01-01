import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authTokenSecret, refreshTokenSecret } from '../constant';
import userQuery from "../queries/user.query";
import { validateUser } from '../utils/validators/user';
import { ErrorHandler, handleCatchError } from "../utils/error";
import type { RegisterUserRawPass, ResRegisterUser } from "../types/user.type";


const register = async (user: RegisterUserRawPass) => {
  try {
    const { email, rawPassword } = user;

    const isUserValid = validateUser(email, rawPassword);

    if (!isUserValid) throw new ErrorHandler(
      401, 'Registering user data is not valid, not registered.'
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const createdUser = await userQuery.createUser({
      ...user,
      password: hashedPassword
    });

    const userDataToSend: ResRegisterUser = {
      id: createdUser.id,
      fullname: createdUser.fullname,
      username: createdUser.username,
      email: createdUser.email,
      authMethod: createdUser.auth_method
    };

    const authToken = await signAuthToken({ id: createdUser.id });
    const refreshToken = await signRefreshToken({ id: createdUser.id });

    return {
      authToken,
      refreshToken,
      user: userDataToSend
    };

  } catch (err) {
    handleCatchError(err);
  };
};

// the server will sign the jwt with the secret
// and server will validate the jwt with the secret
const signAuthToken = async (signData:{id:string}) => {
  try {
    return jwt.sign(
      signData,
      authTokenSecret,
      { expiresIn: '60s' }
    );
  } catch (err) {
    handleCatchError(err);
  };
};

const signRefreshToken = async (signData:{id:string}) => {
  try {
    return jwt.sign(
      signData,
      refreshTokenSecret,
      { expiresIn: '1h' }
    );
  } catch (err) {
    handleCatchError(err);
  }
};


export default {
  register
};
