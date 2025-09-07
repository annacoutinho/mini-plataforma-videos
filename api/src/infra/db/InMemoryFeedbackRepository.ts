import { Feedback } from '../../domain/entities/Feedback'
import { FeedbackRepository } from '../../domain/repositories/FeedbackRepository'

export class InMemoryFeedbackRepository implements FeedbackRepository {
  private readonly items: Feedback[] = []

  async create(feedback: Feedback): Promise<void> {
    this.items.push(feedback)
  }

  async listByVideoId(videoId: string): Promise<Feedback[]> {
    return this.items.filter(feedback => feedback.videoId === videoId)
  }
}
