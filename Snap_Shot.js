import { launch } from 'puppeteer';

(async () => {
  const browser = await launch({'headless': false});

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  );

  await page.goto('https://ilovepdf2.com/');

  await page.setViewport({ width: 1920, height: 1080 });

//   await page.waitForTimeout(1000);

  const screenshot = await page.screenshot({ fullPage: true });

  const base64Screenshot = screenshot.toString('base64');

  const imageDataUrl = 'data:image/png;base64,' + base64Screenshot;

  console.log('Image Data URL:', imageDataUrl);

  await browser.close();
})();
