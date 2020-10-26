import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('When starting the application', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('I should be able to find the application framework', () => {
    page.navigateTo();
    expect(page.getApplicationFramework()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
