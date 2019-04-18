import { User } from "./user";
import { OwnerInfo } from "./owner-info";
import { Tariff } from "./tariff";

import { Type, Expose } from "class-transformer";

export class AccessToken {
    @Expose() access_token: string;
    @Expose() account_number: string;
    @Expose() @Type(() => User) user: User;
    @Expose() @Type(() => OwnerInfo) ownerInfo: OwnerInfo;
    tariff: Tariff;

    constructor(
        access_token: string,
        account_number: string,
        user: User,
        ownerInfo: OwnerInfo,
        tariff: Tariff
    ) {
        Object.assign(this, arguments);
    }
}