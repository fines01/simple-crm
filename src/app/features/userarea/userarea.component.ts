import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.scss']
})
export class UserareaComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isAuth() {
    return this.authService.isLoggedIn;
  }

}
