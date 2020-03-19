import { Router } from 'express';
import * as Users from '../models/users';
import * as Events from '../models/events';
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

router.post('/events', (req, res) => Users
    .getUser(req.body.userId)
    .then(user => Events.processEvents(user, req.body.eventId, req.body.force))
    // .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/event', (req, res) => Events
    .sendEvent(req.body.event)
    // .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
