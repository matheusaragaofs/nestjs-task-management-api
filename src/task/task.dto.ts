export class TaskDto {
  id: string;
  title: string;
  description: String;
  status: string;
  expriationDate: Date;
}


export interface FindAllParameters  { 
  title: string;
  status: string;
}

// A diferença de um DTO de uma interface pra uma classe é que interfaces não são mantidas quando são compiladas para JS, enquanto classes são mantidas. Se não criar uma classe pra fazer essa validação o NestJS não vai conseguir fazer a validação de tipos. Em resumo: se for fazer validação de tipos, use classes. Se não for, use interfaces. Validação quero dizer : se eu passar um objeto que não tem os campos que eu defini no DTO, o NestJS vai reclamar. Se eu passar um objeto que não tem os campos que eu defini na interface, o NestJS não vai reclamar. Na hora da compilação, o TypeScript vai ignorar a interface.