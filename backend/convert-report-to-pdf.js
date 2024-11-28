import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const reportPath = path.resolve(__dirname, 'html-report', 'report.html');
  const pdfPath = path.resolve(__dirname, 'html-report', 'report.pdf');

  if (!fs.existsSync(reportPath)) {
    console.error('Report HTML file does not exist.');
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();
  console.log(`PDF report generated at ${pdfPath}`);
})();