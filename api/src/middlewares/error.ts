import { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
    const e = err as { status: number; message: string }
    return res.status(e.status).json({ error: e.message })
  }

  const message = err instanceof Error ? err.message : 'Internal error'
  return res.status(500).json({ error: message })
}
