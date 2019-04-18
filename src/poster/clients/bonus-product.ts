import { Expose, Type } from "class-transformer";

export class BonusProduct {
    @Expose() @Type(() => Number) type: number;
    @Expose() @Type(() => Number) id: number;
}