import { Component } from '@angular/core';

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    host: { class: 'app-root' }
  })
export class AppComponent
{
  title = 'test-harness';
}
