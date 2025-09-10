import { Feedback } from '../../../domain/entities/Feedback'
import { Rating } from '../../../domain/entities/Rating'
import { FeedbackRepository } from '../../../domain/repositories/FeedbackRepository'
import { loadJsonFile, saveJsonFile } from './JsonStore'

type FeedbackRecord = {
  id: string
  videoId: string
  authorName: string
  rating: number
  comment: string
  createdAt: string
}

const FILE_NAME = 'feedbacks.json'

export class JsonFeedbackRepository implements FeedbackRepository {
  private async loadAll(): Promise<FeedbackRecord[]> {
    return loadJsonFile<FeedbackRecord[]>(FILE_NAME, [])
  }

  private async saveAll(records: FeedbackRecord[]): Promise<void> {
    await saveJsonFile(FILE_NAME, records)
  }

  async create(feedback: Feedback): Promise<void> {
    const allFeedbacks = await this.loadAll()

    const ratingValue =
      feedback.rating instanceof Rating
        ? feedback.rating.toNumber
        : (feedback.rating as number)

    const newRecord: FeedbackRecord = {
      id: feedback.id,
      videoId: feedback.videoId,
      authorName: feedback.authorName,
      rating: ratingValue,
      comment: feedback.comment,
      createdAt: feedback.createdAt.toISOString()
    }

    allFeedbacks.push(newRecord)
    await this.saveAll(allFeedbacks)
  }

  async listByVideoId(videoId: string): Promise<Feedback[]> {
    const allFeedbacks = await this.loadAll()

    return allFeedbacks
      .filter(record => record.videoId === videoId)
      .map(
        record =>
          new Feedback(
            record.id,
            record.videoId,
            record.authorName,
            Rating.create(record.rating),
            record.comment,
            new Date(record.createdAt)
          )
      )
  }
}
