import { Feedback } from '../entities/Feedback';

export interface FeedbackRepository {
  create(feedback: Feedback): Promise<void>;
  listByVideoId(videoId: string): Promise<Feedback[]>;
}
