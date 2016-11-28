import express from 'express';

import stream from './controllers/stream';

const router = express.Router();

router.get('/streams', stream.streams);
router.get('/featured-streams', stream.featuredStreams);
router.post('/stream/create', stream.createStream);
router.get('/stream/:name', stream.getStream);
router.get('/stream/:name/active', stream.isStreamActive);

export default router;
