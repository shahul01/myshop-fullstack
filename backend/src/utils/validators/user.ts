

const validateUser = (email:string, password:string) => {
  const validEmail = typeof email === 'string' &&
    email.length >= 5 &&
    email.trim() !== '' &&
    email.includes('@');

  const validPassword = typeof password === 'string' &&
    password.length >= 6 &&
    password.trim() !== '';

  return validEmail && validPassword;

};

export {
  validateUser
};
