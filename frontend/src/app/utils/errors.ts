

export function errorChecker(res: Response) {
  if (res.status.toString().startsWith('4' || '5')) {
    throw new Error(res.statusText);
  };

};
