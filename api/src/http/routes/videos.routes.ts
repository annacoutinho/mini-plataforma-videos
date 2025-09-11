import { NextFunction, Request, Response, Router } from 'express'
import { Video } from '../../domain/entities/Video'
import { InMemoryVideoRepository } from '../../infra/db/InMemoryVideoRepository'
import { VideoService } from '../../service/video.service'

const videosRouter = Router()

const videoRepo = new InMemoryVideoRepository()
const videoService = new VideoService(videoRepo)

function toVideoDTO(video: Video) {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    providerUrl: video.providerUrl,
    createdAt: video.createdAt.toISOString()
  }
}

videosRouter.get(
  '/videos',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const videos = await videoService.listAll()
      return res.json(videos.map(toVideoDTO))
    } catch (error) {
      return next(error)
    }
  }
)

videosRouter.get(
  '/videos/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const video = await videoService.getById(id)
      return res.json(toVideoDTO(video))
    } catch (error) {
      return next(error)
    }
  }
)

export default videosRouter
