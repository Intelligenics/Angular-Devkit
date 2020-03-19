import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('When I show the main page', () =>
{
    let page: AppPage;

    beforeEach(() =>
    {
        page = new AppPage();
    });

    it('I should display the main test harness', () =>
    {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Test Harness');
    });

    afterEach(async () =>
    {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);

        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE
        } as logging.Entry));
    });
});
