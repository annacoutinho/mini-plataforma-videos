import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { setupSwagger } from '../config/swagger'
import { errorHandler } from '../middlewares/error'
import feedbackRouter from './routes/feedback.routes'
import videosRouter from './routes/videos.routes'

export function createServer(): Application {
  const app = express()

  app.use(express.json())
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
    })
  )

  app.get('/health', (_req: Request, res: Response) => {
    return res.status(200).json({
      ok: true,
      service: 'mini-plataforma-videos',
      version: '1.0.0'
    })
  })

  setupSwagger(app)

  app.use(videosRouter)
  app.use(feedbackRouter)

  app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

  app.use(errorHandler)

  return app
}
