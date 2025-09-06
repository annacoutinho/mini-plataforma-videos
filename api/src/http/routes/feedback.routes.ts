import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { Feedback } from '../../domain/entities/Feedback'
import { Rating } from '../../domain/entities/Rating'
import { InMemoryFeedbackRepository } from '../../infra/db/InMemoryFeedbackRepository'
import { InMemoryVideoRepository } from '../../infra/db/InMemoryVideoRepository'

const router = Router()
const feedbackRepo = new InMemoryFeedbackRepository()
const videoRepo = new InMemoryVideoRepository()

router.post('/feedback', async (req, res) => {
  const bodySchema = z.object({
    videoId: z.string().min(1),
    authorName: z.string().min(1, 'authorName é obrigatório'),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1, 'comment é obrigatório')
  })

  const parsed = bodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid body',
      details: parsed.error.issues
    })
  }

  const { videoId, authorName, rating, comment } = parsed.data

  const video = await videoRepo.findById(videoId)
  if (!video) {
    return res.status(404).json({ error: 'Video not found' })
  }

  const feedback = new Feedback({
    id: uuid(),
    videoId,
    authorName,
    rating: Rating.create(rating),
    comment,
    createdAt: new Date()
  })

  await feedbackRepo.create(feedback)

  return res.status(201).json({
    id: feedback.id,
    videoId: feedback.videoId,
    authorName: feedback.authorName,
    rating: feedback.rating.toNumber,
    comment: feedback.comment,
    createdAt: feedback.createdAt
  })
})

router.get('/feedback/:videoId', async (req, res) => {
  const { videoId } = req.params
  const exists = await videoRepo.findById(videoId)
  if (!exists) return res.status(404).json({ error: 'Video not found' })

  const list = await feedbackRepo.listByVideoId(videoId)
  return res.json(
    list.map(f => ({
      id: f.id,
      videoId: f.videoId,
      authorName: f.authorName,
      rating: f.rating.toNumber,
      comment: f.comment,
      createdAt: f.createdAt
    }))
  )
})

export default router
