import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api";
import type { Video } from "@/types/Video";

export default function Home() {
  const [listaDeVideos, setListaDeVideos] = useState<Video[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get<Video[]>("/videos")
      .then((r) => setListaDeVideos(r.data))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Vídeos</h1>

      {carregando && <p className="mt-4 text-white/70">Carregando...</p>}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {listaDeVideos.map((video) => (
          <li key={video.id} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <h2 className="text-lg font-medium">{video.title}</h2>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">{video.description}</p>

            <div className="mt-3 flex gap-3">
              <Link
                to={`/video/${video.id}`}
                className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/15"
              >
                Assistir
              </Link>
              <Link
                to={`/feedbacks/${video.id}`}
                className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-white/60 hover:text-white/80"
              >
                Ver feedbacks
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {!carregando && listaDeVideos.length === 0 && (
        <p className="mt-4 text-white/70">Nenhum vídeo disponível.</p>
      )}
    </div>
  );
}
