import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Participant } from 'src/participants/entities/participant.entity';
import { Match } from 'src/matches/entities/match.entity';
// import { Match } from './match.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 100, nullable: false })
  category: string;

  @Column('date', { nullable: false })
  startDate: Date;

  @Column('date', { nullable: false })
  endDate: Date;

  @Column('varchar', { length: 50, nullable: false })
  status: string; // (e.g., "in progress", "finished")

  @OneToMany(() => Participant, (participant) => participant.tournament)
  participants: Participant[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];
}
