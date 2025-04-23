export class ProductCreatedCommand {
    constructor(
      public readonly product_id: string,
      public readonly name: string,
    ) {}
  }
  