export class CommentEntity {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly userId: string,
    public readonly madingId: string,
    public readonly role: string,
    public readonly judul: string,
    public readonly isiKomentar: string | null | undefined,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
