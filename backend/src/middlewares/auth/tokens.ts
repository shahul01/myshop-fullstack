import jwt from 'jsonwebtoken';
import { authTokenSecret, tokenName } from "../../constants";
import { ErrorHandler, handleCatchError } from '../../utils/error';
import type { NextFunction, Request, Response } from 'express';
import type { CustomReq } from '../../types/index';


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
        // TODO: add expiry check if not automatically checks
        // if (error.name === 'TokenExpiredError') throw error('refreshToken');
        return res.status(401).json({message: 'Token is not valid, authorization denied'});
      };

      // console.log(`decoded: `, decoded);
      if (!decoded || typeof decoded === 'string' ) throw new ErrorHandler(500, "Error decoding user's id from JWT");

      (req as CustomReq).decoded_userId = decoded.id;

      // console.log(`req: `, req.decoded.userId);

      next();

    });

  } catch (err) {
    handleCatchError(err);
  };

};


export {
  verifyAuthTokenMW
};
