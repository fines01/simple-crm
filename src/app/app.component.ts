import {MediaMatcher} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'simple-crm';
  mobileQuery!: MediaQueryList;
  currentRoute!: string;
  routerSubscription!: Subscription;
  // get template ref variables
  @ViewChild('drawer') drawer!: MatDrawer;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 815px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe( (events: any) => {
      if (events instanceof NavigationEnd) this.currentRoute = events.url;
    });
  }
  
  isHome() {
    this.currentRoute && this.currentRoute.includes('home');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;

  }

  getUser() {
    return this.authService.getAuthUser();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  isAuth() {
    return this.authService.isLoggedIn;
  }

  onOpenDrawer() {
    if (this.drawer) this.drawer.toggle();
  }

}
