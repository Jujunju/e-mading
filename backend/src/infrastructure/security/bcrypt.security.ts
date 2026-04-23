import bcrypt from "bcryptjs"
import { AuthService } from "../../domain/services/auth.service"

export class AuthBcrypt implements AuthService {
    private saltRounds: number = 10;
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds)
    }
    async compare(plainText: string, password: string): Promise<boolean> {
        return await bcrypt.compare(plainText, password)
    }
}