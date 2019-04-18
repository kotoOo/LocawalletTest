export class Tariff {
    constructor(
      public key: string,
      public date_trial: string,
      public tariff_id: string,
      public next_pay_date: string,
      public price: string,
      public name: string
    ) {}
}