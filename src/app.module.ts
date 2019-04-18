import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './versions/v1/v1.module';
import { PosterController } from './poster/poster.controller';
import { PosterModule } from './poster/poster.module';

@Module({
    imports: [
        V1Module,
        PosterModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
