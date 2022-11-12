import {ANIMATION_MODULE_TYPE, Component, OnInit, ViewChild} from '@angular/core';
import {ResourceStat, ResourceStatPercentage} from "../entity/resource-stat";
import {ProductionService} from "../service/production.service";
import {PrecisionIndex} from "../entity/precision-index";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";
import {DataService} from "../service/data.service";
import {Data} from "../entity/data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations'},
  ],
})
export class DashboardComponent implements OnInit {

  constructor(
    private productionService: ProductionService,
    private dataService: DataService) {
  }

  data: Data = this.dataService.data;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  precisionIndexes = Object.values(PrecisionIndex);

  resourcesIn: ResourceStatPercentage[] = [];
  dataSourceIn = new ResourceDataSource(this.resourcesIn);

  resourcesOut: ResourceStatPercentage[] = [];
  dataSourceOut = new ResourceDataSource(this.resourcesIn);

  displayedColumns: string[] = ['resource-color', 'resource', 'amount'];

  precisionIndex: PrecisionIndex = PrecisionIndex.FIVE_SECONDS

  mode: ProgressBarMode = 'determinate'

  ngOnInit(): void {
    setInterval(() => {
      this.updateData()
    }, 400)
    this.dataSourceIn.setData(this.resourcesIn)
  }

  updateData() {
    this.data = this.dataService.data;
    let dataIn: ResourceStat[] = [];
    let dataOut: ResourceStat[] = [];

    if (this.precisionIndex === PrecisionIndex.FIVE_SECONDS) {
      dataIn = this.dataService.data.fiveSecondResourcesIn;
      dataOut = this.dataService.data.fiveSecondResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.ONE_MINUTE) {
      dataIn = this.dataService.data.oneMinuteResourcesIn;
      dataOut = this.dataService.data.oneMinuteResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.TEN_MINUTES) {
      dataIn = this.dataService.data.tenMinutesResourcesIn;
      dataOut = this.dataService.data.tenMinutesResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.ONE_HOUR) {
      dataIn = this.dataService.data.oneHourResourcesIn;
      dataOut = this.dataService.data.oneHourResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.TEN_HOURS) {
      dataIn = this.dataService.data.tenHourResourcesIn;
      dataOut = this.dataService.data.tenHourResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.FIFTY_HOURS) {
      dataIn = this.dataService.data.fiftyHourResourcesIn;
      dataOut = this.dataService.data.fiftyHourResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.TWO_HUNDRED_FIFTY_HOURS) {
      dataIn = this.dataService.data.twoHundredFiftyHourResourcesIn;
      dataOut = this.dataService.data.twoHundredFiftyHourResourcesOut;
    } else if (this.precisionIndex === PrecisionIndex.ONE_THOUSAND_HOURS) {
      dataIn = this.dataService.data.thousandHourResourcesIn;
      dataOut = this.dataService.data.thousandHourResourcesOut;
    }

    let dataInPercentage = this.makePercentage(dataIn);
    let dataOutPercentage = this.makePercentage(dataOut);

    this.mergeLists(dataInPercentage, true);
    this.mergeLists(dataOutPercentage, false);

    this.clearEmptyRows(dataInPercentage, true);
    this.clearEmptyRows(dataOutPercentage, false);

    this.dataSourceIn.setData(this.resourcesIn.sort((a, b) => a.amount > b.amount ? -1 : 1)
      .filter(value => value.amount > 0));
    this.dataSourceOut.setData(this.resourcesOut.sort((a, b) => a.amount > b.amount ? -1 : 1)
      .filter(value => value.amount > 0));
  }

  mergeLists(resourceStatPercentage: ResourceStatPercentage[], isInput: boolean) {
    resourceStatPercentage.forEach(value => {
      this.refreshData(value, isInput);
    })
  }

  clearEmptyRows(resourceStatPercentage: ResourceStatPercentage[], isInput: boolean) {
    if (isInput) {
      this.resourcesIn.forEach((value, i) => {
        if (resourceStatPercentage.find(req => req.resource === value.resource) === undefined) {
          this.resourcesIn.splice(i,1);
        }
      })
    } else {
      this.resourcesOut.forEach((value, i) => {
        if (resourceStatPercentage.find(req => req.resource === value.resource) === undefined) {
          this.resourcesOut.splice(i,1);
        }
      })
    }
  }

  refreshData(resourceStatPercentage: ResourceStatPercentage, isInput: boolean) {
    let updated = false;
    if (isInput) {
      this.resourcesIn.forEach((value) => {
        if (value.resource === resourceStatPercentage.resource) {
          value.amount = resourceStatPercentage.amount
          value.percentages = resourceStatPercentage.percentages
          updated = true;
          return
        }
      });
      if (!updated) {
        this.resourcesIn.push(resourceStatPercentage);
      }
    } else {
      this.resourcesOut.forEach((value) => {
        if (value.resource === resourceStatPercentage.resource) {
          value.amount = resourceStatPercentage.amount
          value.percentages = resourceStatPercentage.percentages
          updated = true;
          return
        }
      });
      if (!updated) {
        this.resourcesOut.push(resourceStatPercentage);
      }
    }
  }

  makePercentage(dataRaw: ResourceStat[]): ResourceStatPercentage[] {
    let result: ResourceStatPercentage[] = [];

    dataRaw = dataRaw.sort((a, b) => a.amount > b.amount ? -1 : 1);
    let maxAmount = dataRaw[0].amount;
    dataRaw.forEach(resource => result.push(new ResourceStatPercentage(resource.resource, resource.amount, resource.amount / maxAmount * 100)))

    return result
  }
}

class ResourceDataSource extends DataSource<ResourceStatPercentage> {
  private _dataStream = new ReplaySubject<ResourceStatPercentage[]>();

  constructor(initialData: ResourceStatPercentage[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ResourceStatPercentage[]> {
    return this._dataStream;
  }

  disconnect() {
  }

  setData(data: ResourceStatPercentage[]) {
    this._dataStream.next(data);
  }
}
