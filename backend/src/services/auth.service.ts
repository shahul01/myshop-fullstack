import bcrypt from 'bcrypt';
import userQuery from "../queries/user.query";
import { handleCatchError } from "../utils/error";
import type { RegisterUserRawPass, ResRegisterUser } from "../types/user.type";


const register = async (user: RegisterUserRawPass) => {
  try {
    const { rawPassword } = user;

    // validate user

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(salt, rawPassword);

    const createdUser = await userQuery.createUser({
      ...user,
      password: hashedPassword
    });

    const userDataToSend: ResRegisterUser = {
      id: createdUser.id,
      fullname: createdUser.fullname,
      username: createdUser.username,
      email: createdUser.email
    };

    // const authToken = signAuthToken();
    // const refreshToken = signRefreshToken();

    return {
      // authToken,
      // refreshToken,
      user: userDataToSend
    };

  } catch (err) {
    handleCatchError(err);
  };
};


export default {
  register
};
