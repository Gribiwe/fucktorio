import {ANIMATION_MODULE_TYPE, Component, OnInit, ViewChild} from '@angular/core';
import {ResourceStat, ResourceStatPercentage} from "../entity/resource-stat";
import {ProductionService} from "../service/production.service";
import {PrecisionIndex} from "../entity/precision-index";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations'},
  ],
})
export class DashboardComponent implements OnInit {

  constructor(private productionService: ProductionService) {
  }

  @ViewChild('empTbSort') empTbSort = new MatSort();

  precisionIndexes = Object.values(PrecisionIndex);

  resourcesIn: ResourceStatPercentage[] = [];
  dataSourceIn = new ResourceDataSource(this.resourcesIn);


  resourcesOut: ResourceStatPercentage[] = [];
  dataSourceOut = new ResourceDataSource(this.resourcesIn);

  displayedColumns: string[] = ['resource-color', 'resource', 'amount'];

  precisionIndex: PrecisionIndex = PrecisionIndex.FIVE_SECONDS

  resourceFlowInterval: any;

  mode: ProgressBarMode = 'determinate'

  ngOnInit(): void {
    this.dataSourceIn.setData(this.resourcesIn)
    this.loadAllResourcesFlow();
    this.resourceFlowInterval = setInterval(() => this.loadAllResourcesFlow(), 5000);
  }

  loadAllResourcesFlow() {
    this.loadResourcesFlow(true);
    this.loadResourcesFlow(false);
  }

  loadResourcesFlow(isInput: boolean) {
    this.productionService.getResourceList(isInput, this.precisionIndex).subscribe(
      (res: ResourceStat[]) => {
        this.updateStats(res, isInput)
      });
  }

  list: any = []
  updateStats(resourceStats: ResourceStat[], isInput: boolean) {
    let resourceStatPercentages = this.makeProgress(resourceStats);

    if (isInput) {
      if (this.resourcesIn === []) {
        this.resourcesIn = resourceStatPercentages
      } else {
        this.mergeLists(resourceStatPercentages, isInput);
      }
    } else {
      if (this.resourcesOut === []) {
        this.resourcesOut = resourceStatPercentages
      } else {
        this.mergeLists(resourceStatPercentages, isInput);
      }
    }

    this.dataSourceIn.setData(this.resourcesIn.sort((a, b) => a.amount > b.amount ? -1 : 1))
    this.dataSourceOut.setData(this.resourcesOut.sort((a, b) => a.amount > b.amount ? -1 : 1))
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

  mergeLists(resourceStatPercentage: ResourceStatPercentage[], isInput: boolean) {
    resourceStatPercentage.forEach(value => {
      this.refreshData(value, isInput);
    })
  }

  makeProgress(resourceStats: ResourceStat[]): ResourceStatPercentage[] {
    let result: ResourceStatPercentage[] = [];
    if (resourceStats.length === 0) {
      result = [];
    } else {
      resourceStats.sort((a, b) => a.amount > b.amount ? -1 : 1);
      let biggestAmount = resourceStats[0].amount;

      for (const element of resourceStats) {
        let item = new ResourceStatPercentage();
        item.amount = element.amount;
        item.resource = element.resource;
        item.percentages = element.amount / biggestAmount * 100;

        result.push(item);
      }
    }

    return result;
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

  disconnect() {}

  setData(data: ResourceStatPercentage[]) {
    this._dataStream.next(data);
  }
}
