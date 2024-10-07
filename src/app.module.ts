import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participants/participant.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { MatchesModule } from './matches/matches.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PlayersModule,
    AuthModule,
    ParticipantModule,
    TournamentsModule,
    MatchesModule,
    ScoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
