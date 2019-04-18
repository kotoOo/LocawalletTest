import { Get, Controller, Res, Query, Post, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import { AccessTokenService } from './v2/auth/access-token.service';
import { AccessToken } from './v2/auth/access-token';
import { ClientService } from './clients/client.service';
import { Client } from './clients/client';
import { plainToClass } from 'class-transformer';

const posterConnectionData = {
    account: "kuhnya-family2",
    application_id: 554,
    application_secret: "f9ca5bee00eee5ede6e67074b4865cf0",
    redirect_uri: "http://127.0.0.1:3000/poster/comeback"
};

const token = '548723:5534028707d4e3aa73127fd5ea56334b';

@Controller('poster')
export class PosterController {
    constructor(
        private readonly accessTokenService: AccessTokenService,
        private readonly clientService: ClientService
    ) {}

    @Get()
    step1(@Res() res: Response) {
        const { account, application_id, redirect_uri } = posterConnectionData;
        
        res.redirect(`https://${account}.joinposter.com/api/auth?application_id=${application_id}&redirect_uri=${redirect_uri}&response_type=code`);
    }

    @Get('comeback')
    async comeback(@Query() query): Promise<AccessToken> {
        const { code, account } = query;

        const AccessToken = await this.accessTokenService.acquire({code: code, account: account, ...posterConnectionData});
        console.log("got token", AccessToken);
        return AccessToken;
    }

    @Get('getClients')
    async getClients() {
        const clients = await this.clientService.getAll(token);

        return '<pre>' + JSON.stringify(clients, null, 4) + '</pre>';
    }

    @Get('updateClient')
    async updateClient() {
        const client = plainToClass(Client, {
            client_id: 3,
            firstname: 'Имя', /* will not update */
            lastname: 'Фамилия', /* will not update */
            patronymic: '',
            discount_per: '0',
            bonus: 1000,
            total_payed_sum: 417000,
            date_activale: '2019-04-18 14:32:35',
            phone: '+380 512 911 112',
            phone_number: '380512911112',
            email: 'changed@email.com', /* will update */
            birthday: '1986-11-23',
            card_number: '0000000000222',
            client_sex: 1,
            country: '',
            city: '',
            address: '',
            comment: '',
            id_1c: undefined,
            client_groups_id: '1',
            client_groups_name: 'Постоянный посетитель',
            loyalty_type: 1,
            client_groups_discount: '10',
            birthday_bonus: '5000',
            delete: 0,
            ewallet: 0 
        });
        
        await this.clientService.updateClient(token, client);

        return true;
    }

    @Get('updateClientObject')
    async updateClientObject() {
        const client_id = 1;
        const email1 = "check@update.com";

        try {
            await this.clientService.updateClient(token, {client_id: client_id, email: email1});
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    @Get('getClient/:id')
    async getClient(@Param('id') id: number) {
        const client = await this.clientService.getClient(token, id);

        return '<pre>' + JSON.stringify(client, null, 4) + '</pre>';
    }

    @Get('getGroups')
    async getGroups() {
        const groups = await this.clientService.getGroups(token);

        return '<pre>' + JSON.stringify(groups, null, 4) + '</pre>';
    }
}