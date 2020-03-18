import { Router } from 'express';
import * as Events from '../models/events';

const router = Router();

router.get('/events-meta', (req, res) => Promise
    .all([
        Events.getFirstEventId(),
        Events.getLastEventId()
    ])
    .then(([
        firstEventId,
        lastEventId,
    ]) => res.json({
        firstEventId,
        lastEventId,
    }))
    .catch(error => res.status(500).json({ error }))
);

router.get('/events', (req, res) => Promise
    .all([
        Events.getFirstEventId(),
        Events.getLastEventId()
    ])
    .then(([
        firstEventId,
        lastEventId,
    ]) => res.json({
        firstEventId,
        lastEventId,
    }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/events', (req, res) => Events
    .addEvent(req.body.event)
    .then(eventId => Promise.all([
        eventId,
        Events.getFirstEventId(),
        Events.getLastEventId(),
    ]))
    .then(([
        eventId,
        firstEventId,
        lastEventId,
    ]) => res.json({
        eventId,
        firstEventId,
        lastEventId,
    }))
    .catch(error => res.status(500).json({ error }))
);

router.delete('/events', (req, res) => Events
    .cleanUp()
    .catch(error => res.status(500).json({ error }))
);

export default router;
