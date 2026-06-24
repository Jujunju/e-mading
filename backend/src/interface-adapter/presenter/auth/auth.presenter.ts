import { LoginResponse } from '../../../domain/responses/auth/auth.response';

export class AuthPresenter {
  static toLoginResponse(data: LoginResponse, token: string) {
    return {
      user: {
        id: data?.user.id?.toString(),
        fullName: data.user.fullName,
        username: data.user.username,
        role: data.user.role,
        kelas: data.user.kelas,
        jurusan: data.user.jurusan,
      },
      token,
    };
  }
}
