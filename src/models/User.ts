import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import bcryptjs from 'bcryptjs';

export default class User {
  id: string;

  @Length(4, 255, { message: 'O nome precisa no mínimo 4 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  password_hash: string;

  @Length(6, 50, { message: 'A senha deve ter entre 6 e 50 caracteres' })
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(data: { id?: string; name: string; email: string; password: string; }) {
    this.id = data.id || '';
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.password_hash = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();

  }

  async hashPassword() {
    const saltRounds = 8;
    this.password_hash = await bcryptjs.hash(this.password, saltRounds);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcryptjs.compare(password, this.password_hash);
  }
}
