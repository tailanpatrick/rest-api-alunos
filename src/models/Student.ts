import { IsEmail, Length, IsInt, Min, Max, IsNumber } from 'class-validator';
import Photo from './Photo';

export default class Student {
  id: string;

  @Length(2, 255, { message: 'O nome precisa no mínimo 2 caracteres' })
  name: string;

  @Length(2, 255, { message: 'O sobrenome precisa no mínimo 2 caracteres' })
  surname: string;

  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  @IsInt({ message: 'A idade deve ser um inteiro positivo.' })
  @Min(0, { message: 'A idade deve ser maior ou igual a 0.' })
  @Max(120, { message: 'A idade máxima permitida é 120.' })
  age: number;

  @IsNumber({}, { message: 'O peso deve ser um número.' })
  @Min(0.1, { message: 'O peso deve ser maior que 0.' })
  @Max(300, { message: 'O peso máximo permitido é 300 kg.' })
  weight: number;

  @IsNumber({}, { message: 'A altura deve ser um número válido.' })
  @Min(0.5, { message: 'A altura deve ser no mínimo 0.5 metros.' })
  @Max(2.5, { message: 'A altura não pode ser maior que 2.5 metros.' })
  height: number;

  photo?: Photo

  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    age: string | number, 
    weight: string | number,
    height: string | number,
    createdAt: Date,
    updatedAt: Date,
    photo?: Photo
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;

    this.age = typeof age === 'string' ? parseInt(age, 10) : age;
    this.weight = typeof weight === 'string' ? parseFloat(weight) : weight;
    this.height = typeof height === 'string' ? parseFloat(height) : height;

    this.photo = photo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type StudentWithoutTimestamps = Omit<Student, "createdAt" | "updatedAt">;