import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Bem-vindo à VideoFeedback</h1>
        <p className="text-white/60">
          Aqui você poderá assistir vídeos, deixar notas e visualizar feedbacks.
        </p>
      </main>
    </div>
  );
}
