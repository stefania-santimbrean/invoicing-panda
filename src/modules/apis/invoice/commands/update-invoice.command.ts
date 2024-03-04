export class UpdateInvoiceCommand {
  constructor(
    public readonly nr: number,
    public readonly currency: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly customer: number,
    public readonly projects: number[],
  ) {}
}
