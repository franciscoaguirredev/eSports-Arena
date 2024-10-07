import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Score } from './entities/score.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Match, Player, Score])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
