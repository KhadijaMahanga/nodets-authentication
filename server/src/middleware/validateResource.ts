import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

const validResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e: any) {
        let err = e;
        if (e instanceof z.ZodError) {
            err = err.issues.map((i: any) => ({ path: i.path[0], message: i.message}))
        }
        return res.sendStatus(400).json({ 
            status: 'failed',
            error: err 
        });
    }
     
}

export default validResource;