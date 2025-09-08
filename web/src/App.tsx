import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import VideoPage from "./Pages/VideoPage";
import FeedbacksPage from "./Pages/FeedbacksPages";
import NovoFeedbackPage from "./Pages/NovoFeedbackPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/feedbacks/:videoId" element={<FeedbacksPage />} />
          <Route path="/feedback/novo/:videoId" element={<NovoFeedbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
