import { browser, logging } from 'protractor'; 
import { <%= classname %>Page } from './<%= lowercasename %>.po';

describe('When I show the <%= classname %> Page', () =>
{
    let page: <%= classname %>Page;

    beforeEach(() =>
    {
        page = new <%= classname %>Page();
    });

    it('I should find the <%= classname %> element', () =>
    {
        page.navigateTo();
        expect(page.get<%= classname %>Element()).toBeTruthy();
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
