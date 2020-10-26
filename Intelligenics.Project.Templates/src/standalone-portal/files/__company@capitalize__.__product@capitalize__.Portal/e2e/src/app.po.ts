import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() : Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getApplicationFramework(): Promise<string> {
    return element(by.css('.int-app-framework')).getTagName() as Promise<string>;
  }
}
