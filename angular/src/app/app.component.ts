import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "./service/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Angular';
  mobileQuery: MediaQueryList;

  fillerNav = [
    {text: "statistics", route: "/dashboard"},
    {text: "test2"}
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private translate: TranslateService,
              private dataService: DataService) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }
}
