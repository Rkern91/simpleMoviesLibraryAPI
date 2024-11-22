import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Filmes }                                             from "./Filme";

@Entity({name: 'categorias'})
export class Categorias {
  @PrimaryGeneratedColumn({name: 'cd_categoria'})
  cd_categoria: number;

  @Column({name: 'nm_categoria'})
  nm_categoria: string;

  @OneToMany(() => Filmes, (filme) => filme.categoria)
  filmes: Filmes[];
}
