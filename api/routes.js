import express from 'express';

import stream from './controllers/stream';

const router = express.Router();

router.get('/streams', stream.streams);
router.get('/featured-streams', stream.featuredStreams);

export default router;
