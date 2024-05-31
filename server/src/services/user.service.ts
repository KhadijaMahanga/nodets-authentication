import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import prisma from "../client";

const SALT_ROUNDS = 10;

export async function createUser(input: Partial<User>) {

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hashSync(input.password, salt)

        return await prisma.user.create({
            data: {
                email: input.email,
                password: hash,
            }
        });
}