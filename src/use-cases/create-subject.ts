import { SubjectsRepository } from '@/repositories/subjects-repository'
import { Subject } from '@prisma/client'
import { SubjectAlreadyExistsError } from './errors/subject-already-exists-error'

interface CreateSubjectUseCaseRequest {
  name: string
  code: string
  description: string | null
}

interface CreateSubjectUseCaseResponse {
  subject: Subject
}

export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({
    name,
    code,
    description,
  }: CreateSubjectUseCaseRequest): Promise<CreateSubjectUseCaseResponse> {
    const subjectWithSameCode = await this.subjectsRepository.findByCode(code)

    if (subjectWithSameCode) {
      throw new SubjectAlreadyExistsError()
    }

    const subject = await this.subjectsRepository.create({
      name,
      code,
      description,
    })

    return {
      subject,
    }
  }
}
