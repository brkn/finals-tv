import {
  Request,
  Response,
} from "express";
import {validate} from "class-validator";
import {getRepository} from "typeorm";

import {
  checkIfGivenInputsAreEmpty,
  checkIfRegisterEmailAlreadyExists,
} from "../../utils/auth-utils";
import {User} from "../../entity/User";

export const register = async (
  req: Request,
  res: Response,
) => {
  const {username, email, password} = req.body;

  const areInputsEmpty = checkIfGivenInputsAreEmpty(
    [
      email,
      password
    ],
    res,
  );
  if (areInputsEmpty) {
    return;
  }

  const isRegisterEmailAlreadyExists = await checkIfRegisterEmailAlreadyExists(
    email,
    res,
  );
  if (isRegisterEmailAlreadyExists) {
    return;
  }

  const user = new User();
  user.construct({
    username,
    email,
    password,
  });

  const validationErrors = await validate(user);
  if (validationErrors.length > 0) {
    res.status(400).send(validationErrors);
    return;
  }

  user.hashPassword();

  const userRepository = getRepository(User);
  userRepository.insert(user);

  res.status(204).send();
};
