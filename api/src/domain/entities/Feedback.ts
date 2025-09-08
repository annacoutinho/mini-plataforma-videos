export class Feedback {
  constructor(
    public readonly id: string,
    public readonly videoId: string,
    public readonly authorName: string,
    public readonly rating: number, // 1..5
    public readonly comment: string,
    public readonly createdAt: Date
  ) {}
}
