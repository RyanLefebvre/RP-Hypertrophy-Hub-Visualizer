import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    AboutDialogComponent,
    ShareDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    SafePipeModule
  ],
  providers: [ThemeService],
  entryComponents: [AboutDialogComponent, ShareDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
