import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getApplicationFramework() {
    return element(by.css('.int-app-framework')).getTagName() as Promise<string>;
  }
}
