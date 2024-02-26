import { launch } from 'puppeteer';

(async () => {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  );

  await page.goto('https://ilovepdf2.com/');
  await page.setViewport({ width: 1920, height: 1080 });

  // Wait for some time (if needed) for the page to render fully before taking the screenshot
  // await page.waitForTimeout(1000);

  // Take a screenshot of the entire page
  const screenshot = await page.screenshot({ fullPage: true });

  // Generate a PDF with the screenshot
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image PDF</title>
      </head>
      <body>
        <img src="data:image/png;base64,${screenshot.toString('base64')}" style="width: 100%;" />
      </body>
    </html>
  `);

  await page.pdf({ path: 'image.pdf', format: 'A4', scale: 1 });

  console.log('PDF saved as image.pdf');

  await browser.close();
})();
