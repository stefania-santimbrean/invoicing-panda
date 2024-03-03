export class MarkAsPaidCommand {
  constructor(
    public readonly invoiceNr: number,
    public readonly paid: boolean,
  ) {}
}
