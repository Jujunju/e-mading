import bcrypt from "bcryptjs"
import { PasswordSecurity } from '../../domain/security/password.security';

export class AuthBcrypt implements PasswordSecurity {
    private saltRounds: number = 10;
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds)
    }
    async compare(plainText: string, password: string): Promise<boolean> {
        return await bcrypt.compare(plainText, password)
    }
}