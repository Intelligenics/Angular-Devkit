import { browser, by, element } from 'protractor';

export class <%= classname %>Page {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  } 

  get<%= classname %>Element() {
    return element(by.css('.int-<%= lowercaseproduct %>-<%= lowercasename %>')).getTagName() as Promise<string>;
  }
}
