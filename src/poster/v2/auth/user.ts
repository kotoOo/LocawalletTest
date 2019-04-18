import { Expose } from "class-transformer";

export class User {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() email: string;
    @Expose() role_id: number;

    constructor(
      id: string,
      name: string,
      email: string,
      role_id: number
    ) {
      Object.assign(this, arguments);
    }
}