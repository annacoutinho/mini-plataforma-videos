import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { api } from "@/api";
import type { Video } from "@/types/Video";

function transformarParaEmbed(urlOriginal: string) {
  return urlOriginal.includes("watch?v=")
    ? urlOriginal.replace("watch?v=", "embed/")
    : urlOriginal;
}

export default function PaginaDoVideo() {
  const { id } = useParams();
  const [videoAtual, setVideoAtual] = useState<Video | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    if (!id) return;

    setCarregando(true);
    setNaoEncontrado(false);

    api.get<Video>(`/videos/${id}`)
      .then((response) => setVideoAtual(response.data))
      .catch((erro: unknown) => {
        const status = (erro as AxiosError).response?.status;
        if (status === 404) setNaoEncontrado(true);
        setVideoAtual(null);
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const urlIncorporada = useMemo(
    () => (videoAtual ? transformarParaEmbed(videoAtual.providerUrl) : ""),
    [videoAtual]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-sm text-white/60 hover:text-white">← Voltar</Link>

      {carregando && <p className="mt-4 text-white/70">Carregando…</p>}
      {naoEncontrado && !carregando && (
        <p className="mt-4 text-red-300">Vídeo não encontrado.</p>
      )}

      {!carregando && videoAtual && (
        <>
          <h1 className="mt-3 text-2xl font-semibold">{videoAtual.title}</h1>
          <p className="mt-1 text-white/70">{videoAtual.description}</p>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe
              className="aspect-video w-full"
              src={urlIncorporada}
              title={videoAtual.title}
              allowFullScreen
            />
          </div>
        </>
      )}
    </div>
  );
}
