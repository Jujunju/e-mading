export interface FrontCommentEntity {
  id: string;
  userId: string;
  madingId: string;
  fullName: string | null | undefined;
  judul: string | null | undefined;
  role: string | null | undefined;
  isiKomentar: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}
