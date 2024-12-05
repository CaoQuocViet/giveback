import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/verify.controller';

const router = express.Router();

router.post('/send', sendOTP);
router.post('/check', verifyOTP);

export default router; 