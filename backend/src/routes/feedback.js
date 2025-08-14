import express from 'express';
import { getPrompt, getFeedback } from '../controllers/feedbackController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/prompt', auth, getPrompt);
router.post('/', auth, getFeedback);

export default router;
