import express from 'express';

import validResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post("/api/users", validResource(createUserSchema), createUserHandler);

export default router;
