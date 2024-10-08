
export default class Student {
  id: string
  name: string
  surname: string
  email: string
  age: number
  weight: number
  height: number
  createdAt: Date
  updatedAt: Date

  constructor(id: string, name: string, surname: string, email: string,
    age: number, weight: number, height: number, createdAt: Date, updatedAt: Date)
    {

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
