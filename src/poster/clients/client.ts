import { Expose, Type, classToPlain } from "class-transformer";
import { AccumulationProducts } from "./accumulations-products";
import { PrizeProducts } from "./prize-products";

export class Client {
    @Expose() @Type(() => Number) client_id: number;
    @Expose() firstname: string;
    @Expose() lastname: string;
    @Expose() patronymic: string;
    @Expose() discount_per: string;
    @Expose() @Type(() => Number) bonus: number;
    @Expose() @Type(() => Number) total_payed_sum: number;
    @Expose() date_activale: string;
    @Expose() phone: string;
    @Expose() phone_number: string;
    @Expose() email: string;
    @Expose() birthday: string;
    @Expose() card_number: string;
    @Expose() @Type(() => Number) client_sex: number;
    @Expose() country: string;
    @Expose() city: string;
    @Expose() address: string;
    @Expose() comment: string;
    @Expose() id_1c: string;
    @Expose() client_groups_id: string;
    @Expose() client_groups_name: string;
    @Expose() @Type(() => Number) loyalty_type: number;
    @Expose() client_groups_discount: string;
    @Expose() birthday_bonus: string;
    @Expose() @Type(() => Number) delete: number;
    @Expose() @Type(() => Number) ewallet: number;

    constructor() {
        Object.assign(this, arguments);
    }

    public toJSON(): Object {
        return classToPlain(this);
    }
}

export class ClientExtended extends Client {
    @Expose() @Type(() => AccumulationProducts) accumulation_products: AccumulationProducts[];
    @Expose() @Type(() => PrizeProducts) prize_products: PrizeProducts[];
}