import { BonusProduct } from "./bonus-product";
import { Expose, Type } from "class-transformer";

export class PrizeProductsConditions {
    @Expose() @Type(() => BonusProduct) bonus_products: BonusProduct[];
    @Expose() @Type(() => Number) bonus_products_pcs: number;
    @Expose() @Type(() => Number) bonus_products_g: number;
    @Expose() @Type(() => Number) bonus_products_condition_type: number;
    @Expose() @Type(() => Number) bonus_products_condition_value: number;
}