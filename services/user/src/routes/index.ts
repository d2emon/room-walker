import { Router } from 'express';
import * as Users from '../models/users';
import * as Perform from '../models/perform';

const router = Router();

router.get('/users', (req, res) => Users
    .getUsers()
    .then(users => res.json({ users }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/user', (req, res) => Users
    .addUser(req.body.userId, req.body.name)
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/action', (req, res) => Users
    .getUser(req.body.userId)
    .then(user => Perform.performAction(user, req.body.action))
    // .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
