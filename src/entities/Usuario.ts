import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import bcrypt                                                               from 'bcryptjs';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn({name: 'cd_usuario'})
  cd_usuario: number;

  @Column({name: 'ds_username', unique: true })
  ds_username: string

  @Column({name: 'ds_password'})
  ds_password: string

  @BeforeInsert()
  async hashPasswordInsert() {
    this.ds_password = await bcrypt.hash(this.ds_password, 10);
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    this.ds_password = await bcrypt.hash(this.ds_password, 10);
  }
}
