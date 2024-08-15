import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  TO_DO = 'TO_D0',
  IN_PRORESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  description: String;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string;

  @IsDateString()
  expriationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}

// A diferença de um DTO de uma interface pra uma classe é que interfaces não são mantidas quando são compiladas para JS, enquanto classes são mantidas. Se não criar uma classe pra fazer essa validação o NestJS não vai conseguir fazer a validação de tipos. Em resumo: se for fazer validação de tipos, use classes. Se não for, use interfaces. Validação quero dizer : se eu passar um objeto que não tem os campos que eu defini no DTO, o NestJS vai reclamar. Se eu passar um objeto que não tem os campos que eu defini na interface, o NestJS não vai reclamar. Na hora da compilação, o TypeScript vai ignorar a interface.
