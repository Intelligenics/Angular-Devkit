import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { <%= classname %>Module } from '../../../module/src/lib/<%= lowercasename %>.module';
import { FrameworkModule } from '@intelligenics/application-framework';

import { AppRouting } from './test-harness.routing';
import { AppComponent } from './components/app.component';

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
        <%= classname %>Module,
      ],
    providers:
      [
      ],
    bootstrap:
      [
        AppComponent
      ]
  } )
export class AppModule { }
