export interface FrontAuthRegisterDTO {
  username: string;
  password: string;
  fullName: string;
  role: string;
  kelas: string;
  jurusan: string;
}

export interface FrontAuthLoginDTO {
  username: string;
  password: string;
}

export interface FrontAuthLoginResponseDTO {
  user: { id: string; fullName: string; username: string; role: string | null | undefined; kelas: string | null | undefined; jurusan: string | null | undefined };
  token: string;
}
