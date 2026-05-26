export class LeadEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly contact: string,
    public readonly message: string,
    public readonly createdAt: Date,
  ) {}
}
