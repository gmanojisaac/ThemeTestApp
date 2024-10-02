import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  @HostBinding('class')
  currentTheme: 'light-theme' | 'dark-theme' = 'dark-theme';
  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.currentTheme = 'dark-theme';
      // localStorage.getItem('theme') == 'dark-theme'
      //   ? 'dark-theme'
      //   : 'light-theme';
    this.isDarkMode = this.currentTheme == 'dark-theme';
  }

  onThemeChanged() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.currentTheme = 'dark-theme';
    } else {
      this.currentTheme = 'light-theme';
    }
    //localStorage.setItem('theme', this.currentTheme);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
