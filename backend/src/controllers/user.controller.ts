import userService from "../services/user.service";
import { ErrorHandler, handleCatchError } from "../utils/error";
import type { Request, Response } from 'express';


const getUserByEmail = async (req:Request, res:Response) => {
  try {
    const {email: reqEmail} = req.body;
    const user = await userService.getUserByEmail(reqEmail);
    res.status(200).json(user);
  } catch (err) {
    handleCatchError(err);
  };

};

const updateUserDetails = async (req:Request, res:Response) => {
  try {
    const { user: reqUser } = req.body;
    const user = userService.updateUserDetails(reqUser);
    res.status(200).json(user);
  } catch (err) {
    handleCatchError(err);
  };

};


export default {
  getUserByEmail,
  updateUserDetails
}
