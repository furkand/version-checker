export class ValidRepostoryError extends Error {
  constructor(value) {
    super(`${value} must be valid.`)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

export class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError)
    }
  }
}

export class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError)
    }
  }
}