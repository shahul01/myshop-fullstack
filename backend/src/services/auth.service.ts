import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authTokenSecret, refreshTokenSecret } from '../constants';
import userQuery from "../queries/user.query";
import { validateUser } from '../utils/validators/user';
import { ErrorHandler, handleCatchError } from "../utils/error";
import type { RegisterUserRawPass, ResRegisterUser, SomeUserColumns } from "../types/user.type";


const register = async (reqUser: RegisterUserRawPass) => {
  try {
    const { email, rawPassword } = reqUser;

    const isUserValid = validateUser(email, rawPassword);

    if (!isUserValid) throw new ErrorHandler(
      401, 'Registering user data is not valid, not registered.'
    );

    const isUserExistEmail = await userQuery.getUserByEmail(['id', 'password'], email);

    if (isUserExistEmail) throw new ErrorHandler(
      401, 'User with this email already exist, not registered.'
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const createdUser = await userQuery.createUser({
      ...reqUser,
      password: hashedPassword
    });
    // console.log(`createdUser: `, createdUser);

    const userDataToSend: ResRegisterUser = {
      id: createdUser.id,
      fullname: createdUser.fullname,
      username: createdUser.username,
      email: createdUser.email,
      authMethod: createdUser.authMethod
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


const login = async (reqEmail:string, reqRawPassword:string) => {

  try {
    const colsToReturn:SomeUserColumns = [
      'id', 'fullname', 'username', 'email', 'password'
    ];
    const {
      id:userId, fullname, username, email, password:dbPassword
    } = await userQuery.getUserByEmail(colsToReturn, reqEmail);

    const isUserValid = validateUser(reqEmail, reqRawPassword);

    if (!isUserValid) throw new ErrorHandler(
      401, 'Logging user data is not valid, not logged in.'
    );

    const isCorrectPassword = await bcrypt.compare(reqRawPassword, dbPassword);

    // NOTE:
    if (!isCorrectPassword) throw new ErrorHandler(
      401, 'Password is not correct, not logged in.'
    );

    // TODO: rename to accessToken
    const authToken = await signAuthToken({ id: userId });
    const refreshToken = await signRefreshToken({ id: userId });

    const userDataToSend:Omit<ResRegisterUser, 'authMethod'> = {
      id: userId,
      fullname,
      username,
      email
    };

    // sends to controller
    return {
      authToken,
      refreshToken,
      user: userDataToSend
    }
  } catch (err) {
    handleCatchError(err);
  };

};

const generateRefreshToken = () => {
  // refer PERN-store
  // verify refreshToken
  // return { authToken, refreshToken };
}


// the server will sign the jwt with the secret
// and server will validate the jwt with the secret
// TODO: simplify, remove async
const signAuthToken = async (signData:{id:string}) => {
  try {
    return jwt.sign(
      signData,
      authTokenSecret,
      { expiresIn: '15m' }
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
      { expiresIn: '7d' }
    );
  } catch (err) {
    handleCatchError(err);
  }
};


export default {
  register,
  login
};
