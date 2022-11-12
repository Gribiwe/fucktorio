import {ResourceStat} from "./resource-stat";

export class Data {
  fiveSecondResourcesIn: ResourceStat[] = [];
  oneMinuteResourcesIn: ResourceStat[] = [];
  tenMinutesResourcesIn: ResourceStat[] = [];
  oneHourResourcesIn: ResourceStat[] = [];
  tenHourResourcesIn: ResourceStat[] = [];
  fiftyHourResourcesIn: ResourceStat[] = [];
  twoHundredFiftyHourResourcesIn: ResourceStat[] = [];
  thousandHourResourcesIn: ResourceStat[] = [];

  fiveSecondResourcesOut: ResourceStat[] = [];
  oneMinuteResourcesOut: ResourceStat[] = [];
  tenMinutesResourcesOut: ResourceStat[] = [];
  oneHourResourcesOut: ResourceStat[] = [];
  tenHourResourcesOut: ResourceStat[] = [];
  fiftyHourResourcesOut: ResourceStat[] = [];
  twoHundredFiftyHourResourcesOut: ResourceStat[] = [];
  thousandHourResourcesOut: ResourceStat[] = [];
}
