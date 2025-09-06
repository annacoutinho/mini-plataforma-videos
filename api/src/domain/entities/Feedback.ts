import { Rating } from './Rating';

export interface FeedbackProps {
  id: string;
  videoId: string;
  authorName: string;
  rating: Rating;
  comment: string;
  createdAt: Date;
}

export class Feedback {
  constructor(private readonly props: FeedbackProps) {}
  get id() { return this.props.id; }
  get videoId() { return this.props.videoId; }
  get authorName() { return this.props.authorName; }
  get rating() { return this.props.rating; }
  get comment() { return this.props.comment; }
  get createdAt() { return this.props.createdAt; }
}
