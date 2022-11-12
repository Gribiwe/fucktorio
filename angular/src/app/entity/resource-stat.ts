export class ResourceStat {
  resource: string = "";
  amount: number = 0;
}

export class ResourceStatPercentage {
  resource: string = "";
  amount: number = 0;
  percentages: number = 0;

  constructor(resource: string, amount: number, percentages: number) {
    this.resource = resource;
    this.amount = amount;
    this.percentages = percentages;
  }
}
