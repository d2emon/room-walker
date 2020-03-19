import { Router } from 'express';
import * as Events from '../models/events';
import * as Characters from '../models/characters';

const router = Router();

router.get('/clean', (req, res) => Promise
    .all([
        Characters.fillCharacters(),
        Events.cleanUp(),
    ])
    .then(() => res.json({
        result: true,
    }))
    .catch(error => res.status(500).json({ error }))
);

router.get('/events-meta', (req, res) => Promise
    .all([
        Events.getFirstEventId(),
        Events.getLastEventId(),
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
    .then(() => Promise.all([
        Events.getFirstEventId(),
        Events.getLastEventId(),
    ]))
    .then(([
        firstEventId,
        lastEventId,
    ]) => res.json({
        firstEventId,
        lastEventId,
    }))
    .catch(error => res.status(500).json({ error }))
);

router.get('/characters', (req, res) => Characters
    .getCharacters()
    .then((characters) => res.json({ characters }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/characters', (req, res) => Characters
    .addCharacter(req.body.name, req.body.channelId)
    .then((character) => res.json({ character }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
