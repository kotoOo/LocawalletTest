import { Module, HttpModule } from '@nestjs/common';
import { AccessTokenService } from './v2/auth/access-token.service';
import { PosterController } from './poster.controller';
import { ClientService } from './clients/client.service';

@Module({
    imports: [
        HttpModule
    ],
    providers: [AccessTokenService, ClientService],
    controllers: [PosterController]
})
export class PosterModule {}