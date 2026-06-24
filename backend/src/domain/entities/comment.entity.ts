export class CommentEntity {
  constructor(
    public readonly id?: string,
    public readonly userId?: string,
    public readonly madingId?: string,
    public readonly isiKomentar?: string | undefined,
    public readonly fullName?: string,
    public readonly role?: string,
    public readonly judul?: string,
    public readonly createdAt?: string | Date,
    public readonly updatedAt?: string | Date,
  ) {}
}
