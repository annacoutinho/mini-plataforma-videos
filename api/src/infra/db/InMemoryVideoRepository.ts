import { Video } from '../../domain/entities/Video'
import { VideoRepository } from '../../domain/repositories/VideoRepository'

const seed: Video[] = [
  new Video({
    id: 'v1',
    title: 'Conceito SOLID de uma forma simples e ilustrativa',
    description: 'Conceitos SOLID',
    providerUrl: 'https://www.youtube.com/watch?v=6SfrO3D4dHM',
    createdAt: new Date()
  }),
  new Video({
    id: 'v2',
    title: 'Design patterns',
    description: 'Explicação rápida e didática de design patterns.',
    providerUrl: 'https://www.youtube.com/watch?v=J-lHpiu-Twk',
    createdAt: new Date()
  })
]

export class InMemoryVideoRepository implements VideoRepository {
  private readonly items: Video[] = [...seed]

  async listAll(): Promise<Video[]> {
    return this.items
  }

  async findById(id: string): Promise<Video | null> {
    return this.items.find(v => v.id === id) ?? null
  }

}
