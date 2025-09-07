export class Video {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly providerUrl: string,
    public readonly createdAt: Date
  ) {}
}
