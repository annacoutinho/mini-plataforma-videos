import { Video } from '../../domain/entities/Video'

export class VideoPresenter {
  static toHTTP(video: Video) {
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      providerUrl: video.providerUrl,
      createdAt: video.createdAt.toISOString()
    }
  }
}
