import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Player } from 'src/players/entities/player.entity';
import { Score } from 'src/scores/entities/score.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Match, Tournament, Player, Score])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
