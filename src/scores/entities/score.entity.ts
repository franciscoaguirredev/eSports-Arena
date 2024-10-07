import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Match, (match) => match.score, { nullable: false })
  match: Match;

  @ManyToOne(() => Player, { nullable: false })
  winner: Player;

  @ManyToOne(() => Player, { nullable: false })
  loser: Player;

  @Column('int', { nullable: false })
  scorePlayer1: number;

  @Column('int', { nullable: false })
  scorePlayer2: number;
}
