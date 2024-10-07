import { Participant } from "src/participants/entities/participant.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Player {
@PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', {
    unique: true,
    length: 150,
    nullable: false,
    name: 'email',
    })
    email:string

    @Column('varchar', { length: 255, select: false, nullable: false })
    password:string

    @OneToMany(()=>Participant,(participant)=>participant.player, {nullable:false})
    participants:Participant

}
