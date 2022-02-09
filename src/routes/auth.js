import { Router } from 'express';
const router = Router();

import {login, logout, register} from '../controllers/auth';

router.post('/api/v1/login', login);
router.post('/api/v1/logout', logout);
router.post('/api/v1/register', register);

export default router;