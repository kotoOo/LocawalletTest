import { Injectable, HttpService } from '@nestjs/common';
import { plainToClass } from "class-transformer";
import { Client, ClientExtended } from './client';
import { ClientsGroup } from './clients-group';

@Injectable()
export class ClientService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    public async getAll(token: string): Promise<Client[]> {
        const result = await new Promise((resolve, reject) => {
            this.httpService.get(`https://joinposter.com/api/clients.getClients`, {
                params: {
                    token: token,
                }
            }).subscribe(
                response => resolve(response.data),
                error => reject(error)
            );
        });

        if (!Array.isArray(result["response"])) throw("Received response is not Array");
        const a: Client[] = result["response"].map(item => plainToClass(Client, item, { strategy: "excludeAll" }));

        //console.log("clientService getAll", a);

        return a;
    }

    /* Pass Object to update partially. */
    public async updateClient(token: string, client: Client | Object): Promise<void> {
        if (!client["client_id"]) throw("Must pass client_id.");
        const body = (client instanceof Client)?client.toJSON():client;

        //console.log("updateClient", body);

        const result = await new Promise((resolve, reject) => {
            this.httpService.post(
                `https://joinposter.com/api/clients.updateClient`, 
                body,
                {
                    params: {
                        token: token,
                    }
                }
            ).subscribe(
                response => resolve(response.data),
                error => reject(error)
            );
        });

        if (result["response"] != client["client_id"]) throw("Not updated.");

        //console.log("updateClient", result);

        return;
    }

    public async getClient(token: string, client_id: number): Promise<ClientExtended> {
        const result = await new Promise((resolve, reject) => {
            this.httpService.get(
                `https://joinposter.com/api/clients.getClient`, 
                {
                    params: {
                        token: token,
                        client_id: client_id
                    }
                }
            ).subscribe(
                response => resolve(response.data),
                error => reject(error)
            );
        });

        //console.log("getClient", result);
        if (!Array.isArray(result["response"])) throw("Received response is not Array");
        if (!result["response"].length) throw("Received response array is empty.");

        const plain: Object = result["response"][0];
        const a: ClientExtended = plainToClass(ClientExtended, plain, { strategy: "excludeAll" });

        return a;
    }

    public async getGroups(token: string): Promise<ClientsGroup[]> {
        const result = await new Promise((resolve, reject) => {
            this.httpService.get(
                `https://joinposter.com/api/clients.getGroups`, 
                {
                    params: {
                        token: token
                    }
                }
            ).subscribe(
                response => resolve(response.data),
                error => reject(error)
            );
        });

        //console.log("getGroups", result);
        if (!Array.isArray(result["response"])) throw("Received response is not Array");
        const plain: Array<Object> = result["response"];
        const a: ClientsGroup[] = plainToClass(ClientsGroup, plain, { strategy: "excludeAll" });
        return a;
    }
}
