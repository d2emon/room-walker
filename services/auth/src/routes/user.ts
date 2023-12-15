import express from 'express';
import {
  delUserHandler,
  getUserHandler,
  postUserHandler,
  putUserHandler,
} from '../handlers/user';

const router = express.Router();

router.get('/', getUserHandler);
router.post('/', postUserHandler);
router.put('/', putUserHandler);
router.delete('/', delUserHandler);

export default router;
