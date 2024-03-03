export class MarkedAsPaidEvent {
  constructor(
    public readonly invoiceNr: number,
    public readonly paid: boolean,
  ) {}
}
