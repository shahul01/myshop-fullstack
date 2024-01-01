import authService from "../services/auth.service";
import { handleCatchError } from "../utils/error";
import type { Request, Response } from 'express';
import type { ResRegisterUser } from "../types/user.type";


const register = async (req:Request, res:Response) => {
  try {

    const createdUser = await authService.register({
      ...req.body,
      rawPassword: req.body.password
    });

    const user:ResRegisterUser|undefined = createdUser?.user;

    // res.header();
    // res.cookie();

    // authToken
    res.status(201).json({ user });

  } catch (err) {
    handleCatchError(err);
  };
};


export default {
  register
};
