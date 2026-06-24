export interface TokenSecurity {
    generateToken(payload: any): Promise<string>
    verifyToken(token: string): any
}