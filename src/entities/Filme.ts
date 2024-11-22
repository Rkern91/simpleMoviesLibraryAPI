import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Categorias }                                        from "./Categoria";

@Entity({name: 'filmes'})
export class Filmes {
  @PrimaryGeneratedColumn({name: 'cd_filme'})
  cd_filme: number;

  @Column({name: 'ds_titulo'})
  ds_titulo: string;

  @Column({name: 'dt_ano'})
  dt_ano: number;

  @Column({name: 'nm_diretor'})
  nm_diretor: string;

  @ManyToOne(() => Categorias)
  @JoinColumn({ name: 'cd_categoria' })
  categoria: Categorias;
}
