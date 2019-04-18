import { Injectable, HttpService } from '@nestjs/common';
import { AccessToken } from './access-token';
import { plainToClass } from "class-transformer";

@Injectable()
export class AccessTokenService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    public async acquire(connectionData): Promise<AccessToken> {
        const body = {
            code: connectionData.code,
            application_id: connectionData.application_id,
            application_secret: connectionData.application_secret,
            redirect_uri: connectionData.redirect_uri,
            grant_type: "authorization_code"
        };

        //console.log("posting", body);
        var FormData = require('form-data');
        var formData = new FormData();
        for(const [key, value] of Object.entries(body)) formData.append(key, value);

        //console.log("formData", formData.toString());

        const config = { headers: formData.getHeaders() }; // headers: { 'content-type': 'multipart/form-data' }

        const result = await new Promise((resolve, reject) => {
            this.httpService.post(`https://${connectionData.account}.joinposter.com/api/v2/auth/access_token`, formData, config).subscribe(
                response => resolve(response.data),
                error => reject(error)
            );
        });

        if (!result["access_token"]) throw("Not authorized.")

        //console.log("transforming answer:", result);

        const accessToken = plainToClass(AccessToken, result, { strategy: "excludeAll" });

        return accessToken;
    }
}
