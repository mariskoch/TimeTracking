import puppeteer from "puppeteer";

export async function generatePDFfromHTML(htmlContent: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
}
