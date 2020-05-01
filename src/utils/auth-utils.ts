import {Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";

import {User} from "../entity/User";
import {generateEmptyInputsErrorMessage} from "./string-utils";

export const createJwt = (
  user: User | {id: string; username: string},
  expiresIn = "1h",
) => {
  const {SECRET} = process.env;
  if (!SECRET) {
    throw new Error("No JWT secret found");
  }

  return jwt.sign(
    {userId: user.id, username: user.username},
    SECRET,
    {expiresIn},
  );
};

export const checkIfGivenInputsAreEmpty = (
  inputs: string[],
  res: Response,
) => {
  if (!inputs.length) {
    throw new Error(
      "Inputs array cannot be empty",
    );
  }

  let areInputsEmpty = false;

  inputs.forEach((input) => {
    if (!input) {
      areInputsEmpty = true;
    }
  });

  if (areInputsEmpty) {
    res.status(400).send({
      Error: generateEmptyInputsErrorMessage(
        inputs,
      ),
    });
  }

  return areInputsEmpty;
};

export const checkIfRegisterEmailAlreadyExists = async (
  email: string,
  res: Response,
) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {email},
  });
  if (user) {
    res.status(400).send({
      Error: "Email already exists",
    });
    return true;
  }

  return false;
};
