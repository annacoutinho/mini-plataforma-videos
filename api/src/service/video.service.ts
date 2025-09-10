import { NotFoundError } from '../core/errors'
import { Video } from '../domain/entities/Video'
import { VideoRepository } from '../domain/repositories/VideoRepository'
import { JsonVideoRepository } from '../infra/db/json/JsonVideoRepository'

export class VideoService {
  private readonly videoRepo: VideoRepository

  constructor(videoRepo: VideoRepository = new JsonVideoRepository()) {
    this.videoRepo = videoRepo
  }

  async listAll(): Promise<Video[]> {
    return this.videoRepo.listAll()
  }

  async getById(id: string): Promise<Video> {
    const video = await this.videoRepo.findById(id)
    if (!video) {
      throw new NotFoundError('Video not found')
    }
    return video
  }
}
