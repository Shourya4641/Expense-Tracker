import express from 'express';

import { addUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/addUser', addUser);

export default router;