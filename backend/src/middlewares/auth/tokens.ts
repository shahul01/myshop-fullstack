import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { authTokenSecret, tokenName } from "../../constants";
import { ErrorHandler, handleCatchError } from '../../utils/error';


const verifyAuthTokenMW = async (req:Request, res:Response, next:NextFunction) => {

  function sanitizeToken(token: string): string {
    const sanitizedToken = token.replace(/^Bearer /, '');
    return sanitizedToken;
  };

  try {


    const authHeader = req.header('Authorization') || '';
    if (!authHeader) throw new ErrorHandler( 401, 'No Authorization header sent. Authentication failed.');

    const token = sanitizeToken(authHeader);
    if (!token) throw new ErrorHandler( 401, 'No token in header. Authentication failed.');

    // if (!authHeader || !token) throw res.status(401).json('No auth header or token in header.');

    // will check for userId (signAuthToken's payload)
    jwt.verify(token, authTokenSecret, (error, decoded) => {
      if (error) {
        // console.log(`error: `, typeof(error), JSON.stringify(error));
        // TODO: add expiry check
        // if (error.name === 'TokenExpiredError') throw error('refreshToken');
        return res.status(401).json({message: 'Token is not valid, authorization denied'});
      };

      // console.log(`decoded: `, decoded);
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
