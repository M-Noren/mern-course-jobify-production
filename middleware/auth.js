import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token
  if(!token) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnAuthenticatedError("Authentication Invalid");
  // }
  // const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // TEST USER
    const testUser = payload.userID === "640282e193fa3649180e9d44";
    req.user = { userID: payload.userID, testUser };
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  next();
};

export default auth;
