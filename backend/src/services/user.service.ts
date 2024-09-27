import userQuery from "../queries/user.query";
import { handleCatchError } from "../utils/error";
import type { SomeUserColumns, SomeUserColumnsWithoutPass, User, UserLocation, UserLocationCamel } from "../types/user.type";

function convertSnakeToCameCase(text: string) :string {
  const toCamel = (str:string) => str.toUpperCase().replace('_', '');
  return text.toLowerCase().replace(/([_]\w)/g, toCamel);
};

type Object = Record<string, unknown>;
function convertSnakeToCameCases(group: Object): Object {
  const groupKeys = Object.entries(group)
    .map(k => (
      [ convertSnakeToCameCase(k[0]), k[1] ]
    ));

  return Object.fromEntries(groupKeys);
};

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

// SomeUserColumns
const updateUserDetails = async (reqUserId: string, userLocationPayload:Partial<UserLocationCamel>) => {
  try {

    // const userEmail = req.decoded.email;

    // Question:
    // I am trying to check how i can get user data via email, when I don't have id...
    // or should I use Id?
    const userLocationRet:(keyof UserLocation)[] = [
      'house_no_and_street_name', 'city', 'state', 'country',
      'phone_number', 'zip_code'
    ];

    const userLocationOldSnakeCase = await userQuery.getUserById(reqUserId, userLocationRet) as unknown as UserLocation;
    const userLocationOld = convertSnakeToCameCases(userLocationOldSnakeCase) as UserLocationCamel;


    const fullUserLocationPayload: UserLocationCamel = {
      ...userLocationOld,
      ...userLocationPayload
    };

    const updatedRes = await userQuery.updateUserDetails(reqUserId, fullUserLocationPayload);
    // if () throw new Error

    return convertSnakeToCameCases(updatedRes);

  } catch (err) {
    handleCatchError(err);
  };

};


export default {
  getUserByEmail,
  updateUserDetails
};
