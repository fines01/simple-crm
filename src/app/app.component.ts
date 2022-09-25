import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  
  title = 'simple-crm';
  mobileQuery!: MediaQueryList;

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


}
