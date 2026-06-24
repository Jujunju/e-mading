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

        return {
          statusCode: 500,
          body: { error: 'Terjadi kesalahan internal serverr' },
        };

    }
}