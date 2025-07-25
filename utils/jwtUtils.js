import jwt from "jsonwebtoken";

export const generateAuthToken = (payload, config) => {
  const secret = process.env.AUTH_TOKEN_SECRET;
  return generateJwtToken(payload, config, secret);
};

export const generateRefreshToken = (payload, config) => {
  const secret = process.env.REFERSH_TOKEN_SECRET;
  return generateJwtToken(payload, config, secret);
};

const generateJwtToken = (payload, config, secret) => {
  const token = jwt.sign(payload, secret, { ...config });
  return token;
};
