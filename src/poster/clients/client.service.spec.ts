import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Client, ClientExtended } from './client';
import { HttpModule } from '@nestjs/common';
import { AccumulationProducts } from './accumulations-products';
import { Product } from './product';
import { ClientsGroup } from './clients-group';

describe('AppController', () => {
    let app: TestingModule;
    const token = '548723:5534028707d4e3aa73127fd5ea56334b';

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                HttpModule
            ],
            providers: [ClientService],
        }).compile();
    });

    describe('getAll', () => {
        it('should return Client[]', async () => {
            const clientService = app.get<ClientService>(ClientService);
            const result = await clientService.getAll(token);
            expect(result).toBeInstanceOf(Array);
            result.forEach(item => {
                expect(item).toBeInstanceOf(Client);
                expect(typeof item.client_id).toBe('number');
                expect(typeof item.firstname).toBe('string');
                expect(item.toJSON()).toBeInstanceOf(Object);
            });
        });
    });

    describe('getClient', () => {
        it('should return ClientExtended', async () => {
            const clientService = app.get<ClientService>(ClientService);
            const client = await clientService.getClient(token, 1);
            expect(client).toBeInstanceOf(ClientExtended);
            
            expect(typeof client.client_id).toBe('number');
            expect(typeof client.firstname).toBe('string');
            expect(client.accumulation_products).toBeInstanceOf(Array);
            client.accumulation_products.forEach(item => {
                expect(item).toBeInstanceOf(AccumulationProducts);
                expect(item.products).toBeInstanceOf(Product);
            });
        });
    });

    describe('getGroups', () => {
        it('should return ClientGroup[]', async () => {
            const clientService = app.get<ClientService>(ClientService);
            const groups = await clientService.getGroups(token);
            expect(groups).toBeInstanceOf(Array);
            groups.forEach(group => {
                expect(group).toBeInstanceOf(ClientsGroup);
                expect(typeof group.client_groups_id).toBe("number");
                expect(typeof group.client_groups_name).toBe("string");
            });
        });
    });

    describe('updateClient', () => {
        jest.setTimeout(30000);
        it('should make an update', async () => {
            const clientService = app.get<ClientService>(ClientService);
            const client_id = 1;
            const email1 = "check@update.com";
            const email2 = "back@again.com";

            await clientService.updateClient(token, {client_id: client_id, email: email1});
            const clientAfterFirstUpdate = await clientService.getClient(token, client_id);
            expect(clientAfterFirstUpdate.email).toBe(email1);

            await clientService.updateClient(token, {client_id: client_id, email: email2});
            const clientAfterSecondUpdate = await clientService.getClient(token, client_id);
            expect(clientAfterSecondUpdate.email).toBe(email2);
        });
    });
});