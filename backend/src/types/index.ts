import type {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";


declare global {
  namespace CustomExpress {
    interface Request extends ExpressRequest {
      decoded_userId?: string;
    }
  }
}

export type CustomReq = CustomExpress.Request;
export type CustomRes = ExpressResponse;
export type CustomNextFn = NextFunction;

export type Controller = (
  req: CustomReq,
  res: CustomRes,
  next: CustomNextFn
) => Promise<CustomRes|void>;

export interface ReqWithDecoded extends ExpressRequest {
  // decoded_userId: string;
  // decoded: { userId: string; };
}

export interface ResponseError extends Error {
  status?: number;
}
