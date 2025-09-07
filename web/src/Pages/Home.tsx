import { useEffect, useState } from "react";
import { api } from "@/api";
import type { Video } from "@/types/Video";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Video[]>("/videos")
      .then(res => setVideos(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Vídeos</h1>

      {loading && <p className="mt-4 text-white/70">Carregando...</p>}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {videos.map(v => (
          <li key={v.id} className="rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-sm">
            <h2 className="text-lg font-medium">{v.title}</h2>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">{v.description}</p>

            {/* os links para /video/:id e /feedbacks/:id virão na próxima branch */}
            <div className="mt-3 flex gap-3">
              <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white/80">
                Assistir (em breve)
              </button>
              <button className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-white/60">
                Ver feedbacks (em breve)
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!loading && videos.length === 0 && (
        <p className="mt-4 text-white/70">Nenhum vídeo disponível.</p>
      )}
    </div>
  );
}
