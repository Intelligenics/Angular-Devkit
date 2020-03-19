import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { <%= classname %>Module } from '../../../module/src/lib/<%= lowercasename %>.module';

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
        BrowserModule,
        AppRouting,
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
