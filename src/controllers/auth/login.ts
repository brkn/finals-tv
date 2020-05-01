import {
  Request,
  Response,
} from "express";
import {getRepository} from "typeorm";

import {User} from "../../entity/User";
import {
  checkIfGivenInputsAreEmpty,
  createJwt,
} from "../../utils/auth-utils";

export const login = async (
  req: Request,
  res: Response,
) => {
  const {username, password} = req.body;

  const areInputsEmpty = checkIfGivenInputsAreEmpty(
    [
      username,
      password
    ],
    res,
  );
  if (areInputsEmpty) {
    return;
  }

  const user = await getUserFromDatabase(
    username as string,
    res,
  );
  if (!user) {
    return;
  }

  validateIfPasswordIsCorrect(
    user,
    password,
    res,
  );

  // Sing JWT, valid for 1 hour
  const token = createJwt(user);
  // Send the jwt in the response
  res.send(token);
};

async function getUserFromDatabase(
  username: string,
  res: Response,
) {
  let userFromDatabase: User | undefined;

  const userRepository = getRepository(User);

  try {
    userFromDatabase = await userRepository.findOneOrFail(
      {where: {username}},
    );
  } catch (error) {
    res.status(401).send({
      Error: "User doesn't exist",
    });
  }

  return userFromDatabase;
}

function validateIfPasswordIsCorrect(
  user: User,
  password: string,
  res: Response,
) {
  if (
    !user.checkIfUnencryptedPasswordMatches(
      password,
    )
  ) {
    res.status(401).send();
  }
}
