import userService from "../services/user.service";
import { UserLocationCamel } from "../types/user.type";
import { ErrorHandler, handleCatchError } from "../utils/error";
import type { Controller } from '../types/index';


const getUserByEmail: Controller = async (req, res)=> {
  try {
    const reqEmail = req.params.email;
    const user = await userService.getUserByEmail(reqEmail);
    res.status(200).json(user);
  } catch (err) {
    handleCatchError(err);
  };

};

const updateUserDetails: Controller = async (req, res) => {
  try {
    const reqUserId = req.params.id;
    const reqUser: Partial<UserLocationCamel> = req.body;

    if (req.decoded_userId !== reqUserId) return res.status(401).json({message: 'Unauthorized access.'});

    const userLocationPayload: Partial<UserLocationCamel> = {
      ...reqUser,
    };

    const user = await userService.updateUserDetails(req.decoded_userId, userLocationPayload);
    res.status(200).json(user);

  } catch (err) {
    handleCatchError(err);
  };

};


export default {
  getUserByEmail,
  updateUserDetails
}
