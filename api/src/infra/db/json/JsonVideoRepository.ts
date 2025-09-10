import { Video } from '../../../domain/entities/Video'
import { VideoRepository } from '../../../domain/repositories/VideoRepository'
import { loadJsonFile } from './JsonStore'

type VideoRecord = {
  id: string
  title: string
  description: string
  providerUrl: string
  createdAt: string
}

const FILE_NAME = 'videos.json'

const seedVideos: VideoRecord[] = [
  {
    id: 'vid_001',
    title: 'Clean Architecture em 10 minutos',
    description: 'Resumo prático dos princípios e camadas.',
    providerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    createdAt: new Date().toISOString()
  },
  {
    id: 'vid_002',
    title: 'TypeScript no backend',
    description: 'Dicas e padrões para APIs Node.',
    providerUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
    createdAt: new Date().toISOString()
  }
]

export class JsonVideoRepository implements VideoRepository {
  private async loadAll(): Promise<Video[]> {
    const records = await loadJsonFile<VideoRecord[]>(FILE_NAME, seedVideos)
    return records.map(
      record =>
        new Video(
          record.id,
          record.title,
          record.description,
          record.providerUrl,
          new Date(record.createdAt)
        )
    )
  }

  async listAll(): Promise<Video[]> {
    return this.loadAll()
  }

  async findById(id: string): Promise<Video | null> {
    const videos = await this.loadAll()
    return videos.find(video => video.id === id) ?? null
  }
}
