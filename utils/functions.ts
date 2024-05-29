import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);

const cropString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;

  const lastPeriodIndex = str.lastIndexOf(".", maxLength);

  if (lastPeriodIndex !== -1) {
    return str.slice(0, lastPeriodIndex + 1);
  } else {
    return str.slice(0, maxLength) + "...";
  }
};
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

const compareHash = (pass: string, hash: string) => {
  return bcrypt.compare(pass, hash);
};
const hashPassword = (pass: string) => {
  return bcrypt.hashSync(pass, salt);
};

export {
  cropString,
  isValidEmail,
  compareHash,
  hashPassword,
  createRandomString,
};
