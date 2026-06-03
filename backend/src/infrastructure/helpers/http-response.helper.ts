import { AppError } from "../../domain/errors/app.error"

export class HttpResponse {
    static created(body: any, message?: string) {
        return {
            statusCode: 201,
            body: {message, data: body}
        }
    }
    static ok(body: any, message?: string) {
        return {
            statusCode: 200,
            body: {message, data: body}
        }
    }

    static error(err: any) {

        if(err instanceof AppError) {
            return {
                statusCode: err.statusCode,
                body: {error: err.message}
            }
        }

        if(err.name === "ValidationError") {
            return {
              statusCode: 400,
              body: { error: err.message },
            };
        }

        if(err.code === 11000) {
            return {
              statusCode: 400,
              body: { error: 'Email tersebut sudah terdaftar!' },
            };
        }

        return {
            statusCode: 500,
            body: {error: "Terjadi kesalahan server"}
        }

    }
}