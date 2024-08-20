import userQuery from "../queries/user.query";
import { SomeUserColumnsWithoutPass } from "../types/user.type";
import { handleCatchError } from "../utils/error";


const getUserByEmail = async (reqEmail:string) => {
  try {

    // Gets all non sensitive data when called from [GET]/user/email
    const colsToReturn:SomeUserColumnsWithoutPass = [
      'id', 'fullname', 'username', 'email',
      'house_no_and_street_name', 'city', 'state', 'country',
      'zip_code', 'phone_number'
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
