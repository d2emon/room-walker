import { Router } from 'express';
import * as Events from '../models/events';

const router = Router();

router.get('/', (req, res) => Events
    .getEvents(req.query.eventId)
    .then(events => res.json({ events }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/', (req, res) => Events
    .sendEvent(req.body.event)
    .then(eventId => res.json({ eventId }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
