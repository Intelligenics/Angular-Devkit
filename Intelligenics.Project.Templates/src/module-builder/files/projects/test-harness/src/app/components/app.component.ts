import { Component } from '@angular/core';

@Component( {
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-expand-xs navbar-dark bg-dark">
      <a class="navbar-brand" routerLink="/">Test Harness</a>
  </nav>
  <int-app-framework></int-app-framework>`,
  host: { class: "app-root" },
  styleUrls: ['app.component.scss']
} )
export class AppComponent
{
}
