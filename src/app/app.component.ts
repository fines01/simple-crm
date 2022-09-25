import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  
  title = 'simple-crm';
  mobileQuery!: MediaQueryList;
  // get template ref variables
  @ViewChild('drawer', {static: true}) drawer!: MatDrawer;

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 815px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isAuth() {
    return this.authService.isLoggedIn;
  }

  onOpenDrawer() {
    if (this.drawer) this.drawer.toggle();
  }

}
