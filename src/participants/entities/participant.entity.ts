import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
// import { Tournament } from './tournament.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Player, (player) => player.participants, { nullable: false })
  player: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.participants, { nullable: false })
  tournament: Tournament;
}
