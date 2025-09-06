import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'; 
import videosRouter from './routes/videos.routes';
import feedbackRouter from './routes/feedback.routes';

export function createServer(): Application {
  const app = express();
  app.use(express.json());


  app.use(cors({
    origin: 'http://localhost:5173',
  }));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ ok: true, service: 'mini-plataforma-videos', version: '1.0.0' });
  });

  app.use(videosRouter);
  app.use(feedbackRouter);

  app.use((_req, res) => res.status(404).json({ error: 'Rota não encontrada' }));
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[ERROR]', err.message);
    res.status(500).json({ error: 'Erro interno' });
  });

  return app;
}
