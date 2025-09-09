import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err && typeof err === "object" && "message" in err) {
    const e = err as { status?: number; message: string };
    const status = e.status ?? 500;
    if (status === 500) {
      console.error("[ERROR]", e.message);
    }
    return res.status(status).json({ error: e.message });
  }

  return res.status(500).json({ error: "Internal error" });
}
