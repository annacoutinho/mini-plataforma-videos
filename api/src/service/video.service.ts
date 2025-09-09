import { Video } from "../domain/entities/Video";
import { VideoRepository } from "../domain/repositories/VideoRepository";

export class VideoService {
  private readonly videoRepo: VideoRepository;

  constructor(videoRepo: VideoRepository) {
    this.videoRepo = videoRepo;
  }

  async listAll(): Promise<Video[]> {
    return this.videoRepo.listAll();
  }

  async getById(id: string): Promise<Video> {
    const video = await this.videoRepo.findById(id);
    if (!video) {
      throw new Error("Video not found");
    }
    return video;
  }
}

