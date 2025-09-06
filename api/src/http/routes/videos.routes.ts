import { Router } from 'express';
import { InMemoryVideoRepository } from '../../infra/db/InMemoryVideoRepository';

const router = Router();
const videoRepo = new InMemoryVideoRepository();

router.get('/videos', async (_req, res) => {
  const videos = await videoRepo.listAll();
  res.json(videos);
});

export default router;
