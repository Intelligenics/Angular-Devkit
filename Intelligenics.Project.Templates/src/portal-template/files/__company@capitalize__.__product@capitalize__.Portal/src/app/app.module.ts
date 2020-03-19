import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkModule } from '@intelligenics/application-framework';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule(
  {
    declarations:
      [
        AppComponent,
      ],
    imports:
      [
        BrowserAnimationsModule,
        BrowserModule,
        AppRouting,
        FrameworkModule,
      ],
    providers: [],
    bootstrap: [AppComponent]
  } )
export class AppModule { }
