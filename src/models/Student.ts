import { IsEmail, Length, IsInt, Min, Max, IsNumber } from 'class-validator';


export default class Student {
  id: string


  @Length(2, 255, { message: 'O nome precisa no mínimo 2 caracteres' })
  name: string

  @Length(2, 255, { message: 'O sobrenome precisa no mínimo 2 caracteres' })
  surname: string

  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string

  @IsInt({ message: 'A idade deve ser um inteiro positivo.' })
  @Min(0, { message: 'A idade deve ser maior ou igual a 0.' })
  @Max(120, { message: 'A idade máxima permitida é 120.' })
  age: number


  @IsNumber({}, { message: 'O peso deve ser um número.' })
  @Min(0.1, { message: 'O peso deve ser maior que 0.' })
  @Max(300, { message: 'O peso máximo permitido é 300 kg.' })
  weight: number

  @IsNumber({}, { message: 'A altura deve ser um número válido.' })
  @Min(0.5, { message: 'A altura deve ser no mínimo 0.5 metros.' })
  @Max(2.5, { message: 'A altura não pode ser maior que 2.5 metros.' })
  height: number

  createdAt: Date
  updatedAt: Date

  constructor(id: string, name: string, surname: string, email: string,
    age: number, weight: number, height: number, createdAt: Date, updatedAt: Date) {

    if (!Number.isInteger(age) || age <= 0) {
      throw new Error('Age must be a positive integer.');
    }

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }


}
