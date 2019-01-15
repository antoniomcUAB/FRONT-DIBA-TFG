import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  routeOptions: Options;

  options = {
    lang: 'es',
    theme: 'winter',
    settings: false,
    docked: true,
    boxed: false,
    opened: false
  };

  currentLang = 'es';

  @ViewChild('sidebar') sidebar;
  @ViewChild('sidemenu') sidemenu;

  constructor (
    private _element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private titleService: Title,
    zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => {
      this.mediaMatcher = mql;
    }));
  }

  ngOnInit(): void {
    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      document.querySelector('.main-content').scrollTop = 0;
      if (this.isOver()) {
        this.sidemenu.close();
      }
      this.runOnRouteChange();
    });

    this.runOnRouteChange();
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

    if (this.routeOptions.hasOwnProperty('heading')) {
      this.setTitle(this.routeOptions.heading);
    }
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( 'CEGE | ' + newTitle );
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  receiveMessage($event) {
    this.options = $event;
  }

  toggleFullscreen(): void {
    const elem = this._element.nativeElement.querySelector('.main-content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}
