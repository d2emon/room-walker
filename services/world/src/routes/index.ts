import { Router } from 'express';
import * as Events from '../models/events';

const router = Router();

router.get('/events/data', (req, res) => Promise
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

export default router;
