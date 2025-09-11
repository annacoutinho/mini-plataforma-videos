import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Feedback } from "../../domain/entities/Feedback";
import { Rating } from "../../domain/entities/Rating";
import { InMemoryFeedbackRepository } from "../../infra/db/InMemoryFeedbackRepository";
import { InMemoryVideoRepository } from "../../infra/db/InMemoryVideoRepository";
import { FeedbackService } from "../../service/feedback.service";

const feedbackRouter = Router();

const feedbackRepo = new InMemoryFeedbackRepository();
const videoRepo = new InMemoryVideoRepository();
const service = new FeedbackService(feedbackRepo, videoRepo);

const createBodySchema = z.object({
  videoId: z.string().min(1, "videoId is required"),
  authorName: z.string().min(1, "authorName is required"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1, "comment is required"),
});

function toFeedbackDTO(feedback: Feedback) {
  const rating =
    feedback.rating instanceof Rating ? feedback.rating.toNumber : feedback.rating;

  return {
    id: feedback.id,
    videoId: feedback.videoId,
    authorName: feedback.authorName,
    rating,
    comment: feedback.comment,
    createdAt: feedback.createdAt.toISOString(),
  };
}

feedbackRouter.post(
  "/feedback",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = createBodySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid body",
          details: parsed.error.issues,
        });
      }

      const created = await service.createFeedback(parsed.data);
      return res.status(201).json(toFeedbackDTO(created));
    } catch (error) {
      return next(error);
    }
  }
);

feedbackRouter.get(
  "/feedback/:videoId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params;
      const list = await service.getFeedbackByVideo(videoId);
      return res.json(list.map(toFeedbackDTO));
    } catch (error) {
      return next(error);
    }
  }
);

export default feedbackRouter;
