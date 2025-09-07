import { Video } from '../../domain/entities/Video'
import { VideoRepository } from '../../domain/repositories/VideoRepository'

const seed: Video[] = [
  new Video(
    '1',
    'Conceito SOLID',
    'Desvendando o SOLID de uma forma simples',
    'https://www.youtube.com/watch?v=6SfrO3D4dHM',
    new Date()
  ),
  new Video(
    '2',
    'Design Patterns',
    'Explicação rápida e didática de design patterns.',
    'https://www.youtube.com/watch?v=J-lHpiu-Twk',
    new Date()
  )
]

export class InMemoryVideoRepository implements VideoRepository {
  private readonly items: Video[] = [...seed]

  async listAll(): Promise<Video[]> {
    return this.items
  }

  async findById(id: string): Promise<Video | null> {
    return this.items.find(video => video.id === id) ?? null
  }
}
