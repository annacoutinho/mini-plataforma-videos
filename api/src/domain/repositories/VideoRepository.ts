import { Video } from '../entities/Video';

export interface VideoRepository {
  listAll(): Promise<Video[]>;
  findById(id: string): Promise<Video | null>;
}
