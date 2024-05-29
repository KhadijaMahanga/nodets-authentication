import User, { UserModel } from "../database/models/user.model";

export function createUser(input: UserModel) {
    return User.create(input)
}