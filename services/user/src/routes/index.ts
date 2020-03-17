import { Router } from 'express';
import * as Users from '../models/users';

const router = Router();

router.get('/', (req, res) => Users
    .getUsers()
    .then(users => res.json({ users }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/', (req, res) => Users
    .addUser(req.body.userId, req.body.name)
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
