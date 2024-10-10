import { Type } from 'class-transformer';
import { IsString, IsDate, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { statusTournament } from 'src/common/enums/tournament.enum';
import { IsNull } from 'typeorm';

export class CreateTournamentDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  category: string;

  @IsDate()
  @IsNotEmpty()
  @Type(()=> Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(()=> Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @IsEnum(statusTournament, {message: 'Status must be on of the following: On hold, Upcoming, Postponed'})
  status: statusTournament;
}
