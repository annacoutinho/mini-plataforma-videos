import { Rating } from "./Rating";

export class Feedback {
  constructor(
    public readonly id: string,
    public readonly videoId: string,
    public readonly authorName: string,
    public readonly rating: Rating, 
    public readonly comment: string,
    public readonly createdAt: Date
  ) {}
}
