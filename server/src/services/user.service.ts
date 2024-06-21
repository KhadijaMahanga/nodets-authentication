import bcrypt from "bcrypt";

import prisma from "../client";
import { CreateUserInput } from "../schemas/user.schema";

const SALT_ROUNDS = 10;

export async function createUser(input: CreateUserInput) {

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = bcrypt.hashSync(input.password, salt);

        return await prisma.user.create({
            data: {
                ...input,
                password: hash,
            }
        });
}