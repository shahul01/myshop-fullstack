import authService from '../services/auth.service';
import { ErrorHandler, handleCatchError } from '../utils/error';
import type { Request, Response } from 'express';


const register = async (req:Request, res:Response) => {
  try {

    const createdUser = await authService.register({
      ...req.body,
      rawPassword: req.body.password,
      authMethod: 'local'
    });

    if (!createdUser) {
      throw new ErrorHandler(500, 'Server error during registration, not registered.');
    };

    const { authToken, refreshToken, user } = createdUser;

    if (Object.values(createdUser).some(val => !val)) {
      throw new ErrorHandler(500, 'Server error during registration, not registered.');
    };

    res.header("auth-token", authToken);
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'development' ? true: 'none',
      secure: process.env.NODE_ENV === 'development' ? false: true
    });
    res.status(201).json({
      authToken,
      user
    });

  } catch (err) {
    handleCatchError(err);
  };

};


const login = async (req:Request, res:Response) => {
  try {

    const { email:reqEmail, password:reqRawPassword } = req.body;
    const loggedInUser = await authService.login(
      reqEmail, reqRawPassword
    );

    if (!loggedInUser) throw new ErrorHandler(500, 'Server error during logging in, not logged in.');

    const { authToken, refreshToken, user } = loggedInUser;

    if (Object.values(loggedInUser).some(val => !val)) {
      throw new ErrorHandler(500, 'Server error during logging in, not logged in.');
    };

    res.header('auth-token', authToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'development' ? true : 'none',
      secure: process.env.NODE_ENV === 'development' ? false : true
    });
    res.status(200).json({
      authToken,
      user
    });

  } catch (err) {
    handleCatchError(err);
  };

};


export default {
  register,
  login
};
