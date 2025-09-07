import { Router } from "express";
import { InMemoryVideoRepository } from "../../infra/db/InMemoryVideoRepository";
import { VideoPresenter } from "../presenters/video.presenter";

const videosRouter = Router();
const repo = new InMemoryVideoRepository();

videosRouter.get("/videos", async (_req, res) => {
  const list = await repo.listAll();
  return res.json(list.map(VideoPresenter.toHTTP));
});

videosRouter.get("/videos/:id", async (req, res) => {
  const video = await repo.findById(req.params.id);
  if (!video) return res.status(404).json({ error: "Vídeo não encontrado" });
  return res.json(VideoPresenter.toHTTP(video));
});

export default videosRouter;
