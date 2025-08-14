import express from 'express';
import { createWriting, getWritings, getDashboard } from '../controllers/writingController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createWriting);
router.get('/', auth, getWritings);
router.get('/dashboard', auth, getDashboard);

export default router;
