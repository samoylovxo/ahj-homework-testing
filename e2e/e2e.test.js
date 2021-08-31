import puppeteer from 'puppeteer';

jest.setTimeout(100000);

describe('cards form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('check is valid mir', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.credit-cards__form');
    const input = await form.$('.card-input');
    await input.type('2355400056296711');
    const submit = await form.$('.btn');
    submit.click();
    await page.waitFor('.card-input');
  });

  it('check is valid', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.credit-cards__form');
    const input = await form.$('.card-input');
    await input.type('5555555555554444');
    const submit = await form.$('.btn');
    submit.click();
    await page.waitFor('.card-input.valid');
  });
});
