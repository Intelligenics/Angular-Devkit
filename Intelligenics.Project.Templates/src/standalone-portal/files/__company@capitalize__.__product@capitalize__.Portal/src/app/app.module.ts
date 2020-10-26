import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FrameworkModule } from '@intelligenics/application-framework';
import { NgModule } from '@angular/core';

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
        AppRoutingModule,
        FrameworkModule,
      ],
    providers: [],
    bootstrap: [AppComponent]
  } )
export class AppModule { }
