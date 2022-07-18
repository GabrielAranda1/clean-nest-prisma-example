import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './CreatePersonDTO';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
