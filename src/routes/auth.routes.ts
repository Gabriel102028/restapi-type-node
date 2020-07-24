import { Router } from 'express';
const router = Router();
import {signUp, signIn} from '../controllers/user.controller'

router.post('/signUp', signUp)
router.post('/signIn', signIn)

export default router;
