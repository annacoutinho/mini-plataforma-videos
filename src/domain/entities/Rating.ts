export class Rating {
  private constructor(private readonly value: number) {}
  static create(value: number): Rating {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error('Rating deve ser inteiro entre 1 e 5');
    }
    return new Rating(value);
  }
  get toNumber(): number { return this.value; }
}
