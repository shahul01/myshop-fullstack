import userQuery from "../queries/user.query";
import { SomeUserColumns } from "../types/user.type";
import { handleCatchError } from "../utils/error";


const getUserByEmail = async (reqEmail:string) => {
  try {

    // Gets all non secure data when called from [GET]/user/email
    const colsToReturn:SomeUserColumns = [
      'id', 'fullname', 'username', 'email', 'full_address', 'zip_code', 'phone_number'
    ];
    return await userQuery.getUserByEmail(colsToReturn, reqEmail);
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
