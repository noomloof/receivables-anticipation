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
  periodsArray,
  under1Message,
  value,
  valuesArray,
} from './testData';

describe('../App.js', () => {
  let browser;
  let page;

  const clearInput = async (target) => {
    const input = await page.$(target);
    await input.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
  };

  const basicInput = async () => {
    await page.click('.input-value');
    await page.type('.input-value', value);
    await page.click('.input-installments');
    await page.type('.input-installments', installments);
    await page.click('.input-percent');
    await page.type('.input-percent', mdr);
    await page.click('.input-days');
    await page.type('.input-days', periods);
  };

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  it('calculator side contains basic text', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.calc-title');

    const text = await page.$eval('.calc-title', (e) => e.textContent);
    expect(text).toContain('Simulate your prepayment');
  });

  it('results side contains basic text', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.calc-title');

    const text = await page.$eval('.result-title', (e) => e.textContent);
    expect(text).toContain("YOU'LL RECEIVE");
  });

  it('inputs work properly', async () => {
    await page.goto('http://localhost:3000/');
    await basicInput();

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
    await clearInput('.input-installments');
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
    await page.type('.input-installments', '0');
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 1300));
    const error7 = await page.evaluate(() => {
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
    const error8 = await page.evaluate(() => {
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
    const error9 = await page.evaluate(() => {
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
    expect(error7).toBe(under1Message);
    expect(error8).toBe(above100Message);
    expect(error9).toBe(over10PeriodsMessage);
  });

  it('calculator works with proper data', async () => {
    await page.goto('http://localhost:3000/');
    await basicInput();
    await page.click('.action-button');
    await new Promise((r) => setTimeout(r, 2000));

    const day1 = await page.$eval(
      `.day-${periodsArray[0]}`,
      (e) => e.textContent
    );
    const day2 = await page.$eval(
      `.day-${periodsArray[1]}`,
      (e) => e.textContent
    );
    const day3 = await page.$eval(
      `.day-${periodsArray[2]}`,
      (e) => e.textContent
    );
    const day4 = await page.$eval(
      `.day-${periodsArray[3]}`,
      (e) => e.textContent
    );

    const value1 = await page.$eval(
      `.value-${valuesArray[0]}`,
      (e) => e.textContent
    );
    const value2 = await page.$eval(
      `.value-${valuesArray[1]}`,
      (e) => e.textContent
    );
    const value3 = await page.$eval(
      `.value-${valuesArray[2]}`,
      (e) => e.textContent
    );
    const value4 = await page.$eval(
      `.value-${valuesArray[3]}`,
      (e) => e.textContent
    );

    expect(day1).toContain('Tomorrow');
    expect(day2).toContain(periodsArray[1]);
    expect(day3).toContain(periodsArray[2]);
    expect(day4).toContain(periodsArray[3]);

    expect(value1.replace(/\s/g, ' ')).toBe('R$ 78,53');
    expect(value2.replace(/\s/g, ' ')).toBe('R$ 83,12');
    expect(value3.replace(/\s/g, ' ')).toBe('R$ 90,25');
    expect(value4.replace(/\s/g, ' ')).toBe('R$ 95,00');
  });

  afterAll(async () => {
    await browser.close();
  });
});
