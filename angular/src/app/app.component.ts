import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {TranslateService} from "@ngx-translate/core";

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
  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }
}
