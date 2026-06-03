interface V8ErrorConstructor extends ErrorConstructor {
  captureStackTrace(target?: object, constructorOpt?: Function): any;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    if (typeof (Error as V8ErrorConstructor).captureStackTrace === 'function') {
      (Error as V8ErrorConstructor).captureStackTrace(this, this.constructor);
    }
  }
}
