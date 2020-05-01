import {
  Request,
  Response,
} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {User} from "../../entity/User";
import {checkIfGivenInputsAreEmpty} from "../../utils/auth-utils";

export const changePassword = async (req: Request, res: Response) => {
  const {oldPassword, newPassword} = req.body;

  const areInputsEmpty = checkIfGivenInputsAreEmpty([
    oldPassword,
    newPassword
  ], res);
  if (areInputsEmpty) {
    return;
  }

  // Get ID from JWT
  const {userId} = res.locals.jwtPayload;
  // Get user from the database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(userId);
  } catch {
    res.status(401).send();
    return;
  }

  // Validate de model (password length)
  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  // Hash the new password and save
  user.hashPassword();
  userRepository.save(user);
  res.status(204).send();
};
