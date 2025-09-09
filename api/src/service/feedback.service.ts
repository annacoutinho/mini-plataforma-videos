import { v4 as uuid } from "uuid";
import { Feedback } from "../domain/entities/Feedback";
import { FeedbackRepository } from "../domain/repositories/FeedbackRepository";
import { VideoRepository } from "../domain/repositories/VideoRepository";
import { Rating } from "../domain/entities/Rating";

export class FeedbackService {
  private readonly feedbackRepo: FeedbackRepository;
  private readonly videoRepo: VideoRepository;

  constructor(feedbackRepo: FeedbackRepository, videoRepo: VideoRepository) {
    this.feedbackRepo = feedbackRepo;
    this.videoRepo = videoRepo;
  }

  async createFeedback(data: {
    videoId: string;
    authorName: string;
    rating: number;
    comment: string;
  }): Promise<Feedback> {
    const { videoId, authorName, rating, comment } = data;

    const video = await this.videoRepo.findById(videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    const ratingVO = Rating.create(rating);

    const feedback = new Feedback(
      uuid(),
      videoId,
      authorName,
      ratingVO,
      comment,
      new Date()
    );

    await this.feedbackRepo.create(feedback);
    return feedback;
  }

  async getFeedbackByVideo(videoId: string): Promise<Feedback[]> {
    const video = await this.videoRepo.findById(videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    return this.feedbackRepo.listByVideoId(videoId);
  }
}
