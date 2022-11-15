import puppeteer from 'puppeteer';
import {
  above100Message,
  above12Message,
  incorrectMessage,
  installments,
  lowMessage,
  mdr,
  missingMessage,
  over10PeriodsMessage,
  periods,
  value,
} from './testData';

describe('../App.js', () => {
  let browser;
  let page;

  const clearInput = async (target) => {
    const input = await page.$(target);
    await input.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
  };

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  it('calculator side contains basic text', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.calc-title');

    const text = await page.$eval('.calc-title', (e) => e.textContent);
    expect(text).toContain('Simule sua antecipação');
  });

  it('results side contains basic text', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.calc-title');

    const text = await page.$eval('.result-title', (e) => e.textContent);
    expect(text).toContain('VOCÊ RECEBERÁ:');
  });

  it('inputs work properly', async () => {
    await page.goto('http://localhost:3000/');
    await page.type('.input-value', value);
    await page.type('.input-installments', installments);
    await page.type('.input-percent', mdr);
    await page.type('.input-days', periods);

    // const input = await page.waitForSelector('.input-value');
    // const text = await page.evaluate((element) => element.value, input);
    const text1 = await page.$eval('.input-value', (e) => e.value);
    const text2 = await page.$eval('.input-installments', (e) => e.value);
    const text3 = await page.$eval('.input-percent', (e) => e.value);
    const text4 = await page.$eval('.input-days', (e) => e.value);
    expect(text1).toBe(value);
    expect(text2).toBe(installments);
    expect(text3).toBe(mdr);
    expect(text4).toBe(periods);
  });

  jest.setTimeout(30000);
  it('trying to calculate with missing and/or wrong information fires an error', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error1 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    await new Promise((r) => setTimeout(r, 300));

    await page.click('.input-value');
    await page.type('.input-value', value);
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error2 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });
    await new Promise((r) => setTimeout(r, 300));

    await page.click('.input-installments');
    await page.type('.input-installments', installments);
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error3 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });
    await new Promise((r) => setTimeout(r, 300));

    await page.click('.input-percent');
    await page.type('.input-percent', mdr);
    await clearInput('.input-value');
    await page.click('.input-value');
    await page.type('.input-value', 'mmm');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error4 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    await new Promise((r) => setTimeout(r, 300));

    await clearInput('.input-value');
    await page.type('.input-value', '500');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error5 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    await new Promise((r) => setTimeout(r, 300));

    await clearInput('.input-value');
    await page.type('.input-value', value);
    await page.type('.input-installments', '20');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error6 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    await new Promise((r) => setTimeout(r, 300));

    await clearInput('.input-installments');
    await page.type('.input-installments', installments);
    await page.type('.input-percent', '101');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error7 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    await new Promise((r) => setTimeout(r, 300));

    await clearInput('.input-percent');
    await page.type('.input-percent', mdr);
    await page.type(
      '.input-days',
      '1, 15, 30, 45, 60, 90, 180, 210, 240, 300, 360'
    );
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error8 = await page.evaluate(() => {
      const divs = Array.from(
        document.querySelectorAll('.Toastify__toast-body div')
      );
      return divs[1].textContent;
    });

    expect(error1).toBe(missingMessage);
    expect(error2).toBe(missingMessage);
    expect(error3).toBe(missingMessage);
    expect(error4).toBe(incorrectMessage);
    expect(error5).toBe(lowMessage);
    expect(error6).toBe(above12Message);
    expect(error7).toBe(above100Message);
    expect(error8).toBe(over10PeriodsMessage);
  });

  afterAll(async () => {
    await browser.close();
  });
});
