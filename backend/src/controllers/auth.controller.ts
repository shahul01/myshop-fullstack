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
      throw new ErrorHandler(500, 'Server error during registration');
    };

    const { authToken, refreshToken, user } = createdUser;

    if (Object.values(createdUser).some(val => !val)) {
      throw new ErrorHandler(500, 'Server error during registration');
    };

    res.header("auth-token", authToken);
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'development' ? true: 'none',
      secure: process.env.NODE_ENV === 'development' ? false: true
    });

    res.status(201).json({ authToken, user });

  } catch (err) {
    handleCatchError(err);
  };
};


export default {
  register
};
