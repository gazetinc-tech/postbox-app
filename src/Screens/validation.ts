/* eslint-disable prettier/prettier */
export const isValidEmail = (email: string) => {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
export const isValidName = (name: string) => {
  let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  return reg.test(name);
};
export const isValidMobile = (mobile: string) => {
  let reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return reg.test(mobile);
};
export const isPasswordLen = (pass: string) => {
  let reg = /^(?=.*[a-zA-Z0-9]).{6,}$/;
  return reg.test(pass);
};
export const isValidPassword = (password: string) => {
  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/;
  return reg.test(password);
};
export const isValidPassCPass = (pass: string, confirmPassword: string) => {
  return pass === confirmPassword;
};
