import { Router } from 'express'
import type { Video } from '../../domain/entities/Video'
import { InMemoryVideoRepository } from '../../infra/db/InMemoryVideoRepository'

const videosRouter = Router()
const videoRepo = new InMemoryVideoRepository()

function toVideoDTO(videoEntity: Video) {
  return {
    id: videoEntity.id,
    title: videoEntity.title,
    description: videoEntity.description,
    providerUrl: videoEntity.providerUrl,
    createdAt: videoEntity.createdAt.toISOString(),
  }
}

videosRouter.get('/videos', async (_req, res) => {
  const videos = await videoRepo.listAll()
  return res.json(videos.map(toVideoDTO))
})

videosRouter.get('/videos/:id', async (req, res) => {
  const { id } = req.params
  const videoEntity = await videoRepo.findById(id)

  if (!videoEntity) {
    return res.status(404).json({ message: 'Vídeo não encontrado' })
  }

  return res.json(toVideoDTO(videoEntity))
})

export default videosRouter
