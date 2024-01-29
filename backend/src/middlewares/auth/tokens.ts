import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { authTokenSecret, tokenName } from "../../constants";
import { handleCatchError } from '../../utils/error';


const verifyAuthTokenMW = async (req:Request, res:Response, next:NextFunction) => {

  const token = req.header(tokenName);
  if (!token) {
    return res.status(401).json({message: 'No token, authorisation denied.'});
  };

  try {
    jwt.verify(token, authTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({message: 'Token is not valid, authorisation denied'});
      };

      // req.id = decoded.id;

      next();

    });

  } catch (err) {
    handleCatchError(err);
  };

};


export {
  verifyAuthTokenMW
};
