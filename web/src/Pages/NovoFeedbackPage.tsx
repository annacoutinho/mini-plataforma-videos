import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "@/api";
import type { Feedback } from "@/types/Feedback";
import type { Video } from "@/types/Video";
import NotaSelector from "@/components/NotaSelector";

export default function NovoFeedbackPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [video, setVideo] = useState<Video | null>(null);


  useEffect(() => {
    if (!videoId) return;

    api
      .get<Video>(`/videos/${videoId}`)
      .then((response) => setVideo(response.data))
      .catch(() => setVideo(null));
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>
        <p className="mt-4 text-red-300">Vídeo inválido.</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);

    try {
      await api.post<Feedback>("/feedback", {
        videoId,
        authorName: nome.trim(),
        rating: nota,
        comment: comentario.trim(),
      });

  
      navigate(`/feedbacks/${videoId}`);
    } catch {
      setErro("Não foi possível enviar seu feedback.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
      >
        <ArrowLeft size={16} /> Voltar
      </Link>

      <h1 className="mt-3 text-2xl font-semibold">Dar feedback</h1>
      <p className="mt-1 text-white/70">
        Deixe sua opinião sobre:{" "}
        <span className="text-white/90">{video?.title ?? "Vídeo desconhecido"}</span>
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-neutral-900 p-5"
      >
        <div>
          <label className="block text-sm text-white/80">Seu nome</label>
          <input
            className="mt-1 w-full rounded-md border border-white/10 bg-neutral-950 p-2 outline-none"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1">Nota</label>
          <NotaSelector value={nota} onChange={setNota} />
          <p className="mt-1 text-xs text-white/50">Selecionado: {nota}/5</p>
        </div>

        <div>
          <label className="block text-sm text-white/80">Comentário</label>
          <textarea
            className="mt-1 w-full rounded-md border border-white/10 bg-neutral-950 p-2 outline-none"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </div>

        {erro && <p className="text-sm text-red-300">{erro}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-md bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/15 disabled:opacity-60"
          >
            {salvando ? "Enviando..." : "Enviar feedback"}
          </button>
          <Link
            to={`/feedbacks/${videoId}`}
            className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white"
          >
            Ver feedbacks
          </Link>
        </div>
      </form>
    </div>
  );
}
