import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
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
  authStateSubscription!: Subscription;
  // get template ref variables
  @ViewChild('drawer') drawer!: MatDrawer;

  private _mobileQueryListener: () => void;
  authUser!: any;

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

    this.authStateSubscription = this.authService.getAuthState().subscribe( (authUser) => {
      console.log(authUser);
      this.authUser = authUser;
      // on auth changes only (login or log out): navigate to resp pages
      if (!authUser) this.router.navigate(['/home/sign-in']);
      if(authUser) this.router.navigate(['dashboard']);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }
  
  isHome() {
    if (this.currentRoute && this.currentRoute.includes('home')) return true;
    return false;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  checkSidenavOpen() {
    return (this.mobileQuery.matches || this.isHome()) ? false : true;
  }

  onOpenDrawer() {
    if (this.drawer) this.drawer.toggle();
  }

}
