import { sendMessage } from '../controllers/message.controller.js';

import { receiveMessage } from '../controllers/message.controller.js';
import { protectedRoute } from '../middlewares/protect.middleware.js';

import express from 'express';
const  router = express.Router();

router.get('/:id', protectedRoute, receiveMessage);
router.post('/send/:id',protectedRoute, sendMessage);


export default router;
