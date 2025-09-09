import { NotFoundError } from '../core/errors'
import { Video } from '../domain/entities/Video'
import { VideoRepository } from '../domain/repositories/VideoRepository'

export class VideoService {
  private readonly videoRepo: VideoRepository

  constructor(videoRepo: VideoRepository) {
    this.videoRepo = videoRepo
  }

  async listAll(): Promise<Video[]> {
    return this.videoRepo.listAll()
  }

  async getById(id: string): Promise<Video> {
    const video = await this.videoRepo.findById(id)
    if (!video) {
      throw new NotFoundError('Video not found') // ✅ em vez de Error genérico
    }
    return video
  }
}
