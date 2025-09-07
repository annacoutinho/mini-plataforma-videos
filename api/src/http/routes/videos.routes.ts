import { Router } from 'express';
import { InMemoryVideoRepository } from '../../infra/db/InMemoryVideoRepository';

const router = Router();
const videoRepo = new InMemoryVideoRepository();

router.get('/videos', async (_req, res) => {
  const videos = await videoRepo.listAll();
  res.json(videos);
});
router.get('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const video = await videoRepo.findById(id);

  if (!video) {
    return res.status(404).json({ error: 'Vídeo não encontrado' });
  }

  res.json(video);
});

export default router;
