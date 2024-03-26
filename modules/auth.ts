import jwt from "jsonwebtoken";
import { nextTick } from "process";
import bcrypt from "bcrypt";

// preferred method to store on browser -> frontend intercepter -> attach to auth headers on outgoing requets

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 13);
};

type User = {
  id: string;
  username: string;
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export const protect = (req: any, res: any, next) => {
  // express will lowercase headers

  // bearer: describe someone having the ability to send a token
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  // bearer ex: "Bearer abcxyz"
  const [, token] = bearer.split(" ");

  if (!token) {
    console.log("no token");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
