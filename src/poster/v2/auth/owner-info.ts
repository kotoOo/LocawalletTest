import { Expose } from "class-transformer";

export class OwnerInfo {
    @Expose() email: string;
    @Expose() phone: string;
    @Expose() city: string;
    @Expose() country: string;
    @Expose() name: string;
    @Expose() company_name: string;

    constructor(
        email: string,
        phone: string,
        city: string,
        country: string,
        name: string,
        company_name: string
    ) {
        Object.assign(this, arguments)
    }
}