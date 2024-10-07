import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Player } from 'src/players/entities/player.entity'
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Score } from 'src/scores/entities/score.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches, { nullable: false })
  tournament: Tournament;

  @ManyToOne(() => Player, { nullable: false })
  player1: Player;

  @ManyToOne(() => Player, { nullable: false })
  player2: Player;

  @OneToOne(() => Score, (score) => score.match)
  score: Score;
}
