import { useState } from "react";
import { api } from "@/api";
import type { Feedback } from "@/types/Feedback";
import NotaSelector from "@/components/NotaSelector";

type Props = {
  videoId: string;
  onSubmitted?: (feedback: Feedback) => void;
  onClose?: () => void;
};

type CreateFeedbackPayload = {
  videoId: string;
  authorName: string;
  rating: number;
  comment: string;
};

export default function FeedbackForm({ videoId, onSubmitted, onClose }: Props) {
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | undefined>();

  function isFormValid() {
    return (
      videoId.trim().length > 0 &&
      nome.trim().length >= 2 &&
      comentario.trim().length >= 2 &&
      nota >= 1 &&
      nota <= 5
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (salvando) return;
    if (!isFormValid()) {
      setErro("Preencha os campos corretamente.");
      return;
    }

    setSalvando(true);
    setErro(undefined);

    const payload: CreateFeedbackPayload = {
      videoId,
      authorName: nome.trim(),
      rating: nota,
      comment: comentario.trim(),
    };

    try {
      const { data: novoFeedback } = await api.post<Feedback>("/feedback", payload);
      onSubmitted?.(novoFeedback);

      if (onClose) {
        onClose();
      } else {
        setNome("");
        setNota(5);
        setComentario("");
      }
    } catch {
      setErro("Não foi possível enviar seu feedback.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm text-white/80">
        Seu nome
        <input
          className="mt-1 w-full rounded-md border border-white/10 bg-neutral-900 p-2 outline-none disabled:opacity-60"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          minLength={2}
          maxLength={80}
          required
          disabled={salvando}
        />
      </label>

      <div className="block">
        <span className="block text-sm text-white/80 mb-1">Nota</span>
        <NotaSelector
          value={nota}
          onChange={setNota}
          className="mt-1"
        />
        <p className="mt-1 text-xs text-white/50">Selecionado: {nota}/5</p>
      </div>

      <label className="block text-sm text-white/80">
        Comentário
        <textarea
          className="mt-1 w-full rounded-md border border-white/10 bg-neutral-900 p-2 outline-none disabled:opacity-60"
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          minLength={2}
          maxLength={1000}
          required
          disabled={salvando}
        />
      </label>

      {erro && <p className="text-sm text-red-300">{erro}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={salvando || !isFormValid()}
          className="rounded-md bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/15 disabled:opacity-60"
        >
          {salvando ? "Enviando..." : "Enviar"}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={salvando}
            className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white disabled:opacity-60"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
