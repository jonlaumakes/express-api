import { comparePasswords } from "../auth";
import prisma from "../../db";
import { createJWT, hashPassword } from "../auth";

export const createNewuser = async (req, res) => {
  // POST req will have a body with username

  // do not store plaintext passwords

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
      //bcrypt defaults to returning a promise
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  // todo: input validation
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "invalid password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
