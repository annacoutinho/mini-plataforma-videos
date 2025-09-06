export interface VideoProps {
  id: string;
  title: string;
  description: string;
  providerUrl: string;
  createdAt: Date;
}

export class Video {
  constructor(private readonly props: VideoProps) {}

  get id() { return this.props.id; }
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get providerUrl() { return this.props.providerUrl; }
  get createdAt() { return this.props.createdAt; }
}
