import { Expose, Type } from "class-transformer";

export class ClientsGroup {
    @Expose() @Type(() => Number) client_groups_id: number;
    @Expose() client_groups_name: string;
    @Expose() @Type(() => Number) client_groups_discount: number;
    @Expose() @Type(() => Number) loyalty_type: number;
    @Expose() @Type(() => Number) birthday_bonus: number;
    @Expose() @Type(() => Number) count_groups_clients: number;
    @Expose() @Type(() => Number) use_ewallet: number;
    @Expose() @Type(() => Number) delete: number;

    constructor() {
        Object.assign(this, arguments);
    }
}