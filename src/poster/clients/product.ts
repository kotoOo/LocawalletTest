import { Expose, Type } from "class-transformer";

export class Product {
    @Expose() @Type(() => Number) count: number;
    @Expose() @Type(() => Number) sum: number;
    @Expose() @Type(() => Number) product_id: number;
    @Expose() @Type(() => Number) modification_id: number;
}