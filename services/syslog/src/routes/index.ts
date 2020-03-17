import { Router } from 'express';
import * as Logging from '../models/logging';

const router = Router();

router.get('/', (req, res) => Logging
    .getRecords()
    .then(records => res.json({ records }))
    .catch(error => res.status(500).json({ error }))
);

router.post('/', (req, res) => Logging
    .addRecord(req.body.message)
    .then(result => res.json({ result }))
    .catch(error => res.status(500).json({ error }))
);

export default router;
