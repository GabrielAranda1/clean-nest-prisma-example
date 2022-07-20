import { CreateLocalDto } from "src/useCases/local/dto/CreateLocalDTO"
import { CreatePersonDto } from "src/useCases/person/dto/CreatePersonDTO"

export class CreateClientDto {
  id: number
  name: string
  clientTypeId: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
  people?: Omit<CreatePersonDto, 'createdBy'>[]
  locals?: Omit<CreateLocalDto, 'createdBy'>[]
}
