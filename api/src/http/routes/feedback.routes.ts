import { Router } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { Feedback } from "../../domain/entities/Feedback";
import { InMemoryFeedbackRepository } from "../../infra/db/InMemoryFeedbackRepository";
import { InMemoryVideoRepository } from "../../infra/db/InMemoryVideoRepository";

const feedbackRouter = Router();
const feedbackRepo = new InMemoryFeedbackRepository();
const videoRepo = new InMemoryVideoRepository();


function toFeedbackDTO(feedback: Feedback) {
  return {
    id: feedback.id,
    videoId: feedback.videoId,
    authorName: feedback.authorName,
    rating: feedback.rating,
    comment: feedback.comment,
    createdAt: feedback.createdAt.toISOString(),
  };
}

feedbackRouter.post("/feedback", async (req, res) => {
  const bodySchema = z.object({
    videoId: z.string().min(1, "videoId é obrigatório"),
    authorName: z.string().min(1, "authorName é obrigatório"),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1, "comment é obrigatório"),
  });

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid body",
      details: parsed.error.issues,
    });
  }

  const { videoId, authorName, rating, comment } = parsed.data;


  const video = await videoRepo.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  const feedback = new Feedback(
    uuid(),
    videoId,
    authorName,
    rating,
    comment,
    new Date()
  );

  await feedbackRepo.create(feedback);

  return res.status(201).json(toFeedbackDTO(feedback));
});

feedbackRouter.get("/feedback/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const video = await videoRepo.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  const list = await feedbackRepo.listByVideoId(videoId);
  return res.json(list.map(toFeedbackDTO));
});

export default feedbackRouter;
