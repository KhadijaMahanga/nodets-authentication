import jwt, {JwtPayload } from "jsonwebtoken";
import { Response } from "express";

import { jwt_secret, jwt_expiry, refresh_expiry, refresh_secret } from "../config";

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
  };

export function generateToken(res: Response, payload: object)  {
    const access_token = jwt.sign(payload, jwt_secret, {
        expiresIn: jwt_expiry
    });

    const refresh_token = jwt.sign(payload, refresh_secret, {
        expiresIn: refresh_expiry
    })

    return res.cookie("jwt", {access_token, refresh_token}, {httpOnly: true, maxAge: 60 * 60 * 1000})
}

export async function verifyToken(token: string, secret: string) {
    
    const decoded: JwtPayload = await new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(new Error());
            else resolve(decoded as JwtPayload)
        })
    });
    return decoded;
};