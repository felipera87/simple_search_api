export class SubjectAlreadyExistsError extends Error {
  constructor() {
    super('Code already exists.')
  }
}
