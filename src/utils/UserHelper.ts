import { validate } from "class-validator";
import User from "../models/User";

class UserHelper {
  static async validateUserData(user: User) {
    const errors = await validate(user);

    if (errors.length > 0) {
      return errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
      }));
    }

    return null;
  }

  static async prepareUserData(body: any) {
    const user = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    await user.hashPassword();
    return user;
  }
}

export default UserHelper;
