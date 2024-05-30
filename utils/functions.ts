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

export function getStatusColor(status: string) {
  const statusColors: { [key: string]: string } = {
    "Not Called": "bg-slate-400 hover:bg-slate-400",
    "Call Scheduled": "bg-slate-300 hover:bg-slate-300",
    Calling: "bg-slate-100 hover:bg-slate-100",
    "No Answer": "bg-red-200 hover:bg-red-200",
    "Left Voicemail": "bg-red-300 hover:bg-red-300",
    "Call Back Later": "bg-yellow-400 hover:bg-yellow-400",
    Interested: "bg-green-400 hover:bg-green-400",
    "Not Interested": "bg-pink-400 hover:bg-pink-400",
    "Do Not Call": "bg-pink-600 hover:bg-pink-600",
  };
  return statusColors[status] || "bg-default"; // Return "bg-default" if status is not found
}
