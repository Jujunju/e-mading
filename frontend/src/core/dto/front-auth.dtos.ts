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