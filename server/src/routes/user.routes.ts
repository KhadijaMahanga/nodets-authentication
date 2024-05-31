import express from 'express';

import validResource from '../middleware/validateResource';
import { createUserSchema } from '../schemas/user.schema';
import { createUserHandler } from '../controllers/user.controller';

const router = express.Router();

router.post("/api/users", validResource(createUserSchema), createUserHandler);

export default router;
