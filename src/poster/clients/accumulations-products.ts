import { Product } from "./product";
import { Expose, Type } from "class-transformer";

export class AccumulationProducts {
    @Expose() @Type(() => Number) promotion_id: number;
    @Expose() @Type(() => Product) products: Product[]
};