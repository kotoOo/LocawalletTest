import { PrizeProductsConditions } from "./prize-products-conditions";
import { Expose, Type } from "class-transformer";

export class PrizeProducts {
    @Expose() @Type(() => Number) prize_product_id: number;
    @Expose() @Type(() => Number) promotion_id: number;
    @Expose() @Type(() => PrizeProductsConditions) conditions: PrizeProductsConditions;
    @Expose() date_accural: string;
}