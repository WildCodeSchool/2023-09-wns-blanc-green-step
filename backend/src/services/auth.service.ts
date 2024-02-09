import * as UserService from "../services/user.service";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string): Promise<string> {
  try {
    const userFromDB = await UserService.getByEmail(email);
    if (await verifyPassword(password, userFromDB.password)) {
      const token = signJwt({
        id: userFromDB.id,
      });
      return token;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error("Invalid Auth");
  }
}

/**
 * return a sign payload
 * @param payload payload to sign
 * @return signed payload
 */

function signJwt(payload: any) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60,
  });
}

/**
 * return the token payload from the token in parameter
 * @param token token to verify
 * @return payload
 */

export function verifyToken(token: string) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export async function verifyPassword(
  password: string,
  hashedhpassword: string
) {
  // on retourne true false en comparant les password via argon2
  return await argon2.verify(hashedhpassword, password);
}
