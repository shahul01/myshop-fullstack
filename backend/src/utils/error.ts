import { ResponseError } from "../types";


// TODO: change this to functional style?
class ErrorHandler extends Error {
  public status: string;

  constructor(public statusCode: number, public message: string) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  };

};

const handleCatchError = (err: unknown) => {
  const errMessage = err instanceof Error ? err.message : 'Unknown error';
  const errStatus = (err as ResponseError)?.status || 500;
  throw new ErrorHandler(errStatus, errMessage);
};


export {
  ErrorHandler,
  handleCatchError
};
