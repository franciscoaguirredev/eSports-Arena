import { Module, OnModuleInit} from "@nestjs/common";
import { DatabaseConfigService } from "./common/config/connection-db.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedModule } from 'src/database/seeds/seed.module';
import { SeedService } from "./database/seeds/seed.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    SeedModule
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})

export class DatabaseModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    setTimeout(async () => {
      await this.seedService.seed();
    }, 500)
  }
}