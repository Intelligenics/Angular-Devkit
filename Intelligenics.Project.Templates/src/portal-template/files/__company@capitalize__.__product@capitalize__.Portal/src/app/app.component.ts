import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<int-app-framework></int-app-framework>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.scss'],
  host: { class: "app-root" }
})
export class AppComponent
{
  title = 'portal';
}
