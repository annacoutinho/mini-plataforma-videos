import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { setupSwagger } from '../config/swagger'
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
    res
      .status(200)
      .json({ ok: true, service: 'mini-plataforma-videos', version: '1.0.0' })
  })

  setupSwagger(app)

  app.use(videosRouter)
  app.use(feedbackRouter)

  app.use((_req, res) => res.status(404).json({ error: 'Rota não encontrada' }))
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[ERROR]', err.message)
    res.status(500).json({ error: 'Erro interno' })
  })

  return app
}
