import userQuery from "../queries/user.query";
import { handleCatchError } from "../utils/error";


const getUserByEmail = async (reqEmail:string) => {
  try {
    return await userQuery.getUserByEmail(reqEmail);
  } catch (err) {
    handleCatchError(err);
  };

};

const updateUserDetails = async (reqUser:Record<string, string>) => {
  try {
    return await userQuery.updateUserDetails(reqUser)
  } catch (err) {
    handleCatchError(err);
  };

};


export default {
  getUserByEmail,
  updateUserDetails
};
