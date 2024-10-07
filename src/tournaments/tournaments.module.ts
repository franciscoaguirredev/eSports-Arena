import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Participant } from 'src/participants/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Participant])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
