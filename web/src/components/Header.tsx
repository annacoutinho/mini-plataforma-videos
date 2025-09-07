export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-neutral-950 to-neutral-900/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-20 flex-col justify-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
            VideoFeedback
          </span>

          <span className="text-sm text-white/60">
            Assista, avalie e veja feedbacks de outros usuários
          </span>
        </div>
      </div>
    </header>
  );
}
