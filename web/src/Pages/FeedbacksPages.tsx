import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "@/api";
import type { Feedback } from "@/types/Feedback";

export default function FeedbacksPage() {
  const { videoId } = useParams();
  const [lista, setLista] = useState<Feedback[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;
    setCarregando(true);
    setErro(null);

    api
      .get<Feedback[]>(`/feedback/${videoId}`)
      .then((response) => setLista(response.data))
      .catch(() => setErro("Não foi possível carregar os feedbacks."))
      .finally(() => setCarregando(false));
  }, [videoId]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <h1 className="mt-3 text-2xl font-semibold">Feedbacks</h1>

      {erro && <p className="mt-2 text-red-300">{erro}</p>}
      {carregando && <p className="mt-2 text-white/70">Carregando...</p>}

      {!carregando && lista.length === 0 && (
        <p className="mt-2 text-white/60">Ainda não há feedbacks para este vídeo.</p>
      )}

      <ul className="mt-6 space-y-3">
        {lista.map((feedback) => (
          <li
            key={feedback.id}
            className="rounded-xl border border-white/10 bg-neutral-900 p-4"
          >
            <div className="flex items-center justify-between">
              <strong className="text-white/90">{feedback.authorName}</strong>
              <span className="text-sm text-white/70">Nota {feedback.rating}/5</span>
            </div>
            <p className="mt-1 text-white/80">{feedback.comment}</p>
            <p className="mt-1 text-xs text-white/40">
              {new Date(feedback.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
