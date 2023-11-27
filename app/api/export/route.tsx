//import puppeteer from "puppeteer";
import { renderToString } from 'react-dom/server';
//import ExportTable from '@/components/ExportTable'

export async function POST(request: Request) {
    /*
    const data = (await request.json()).Year_and_Month;
    const [year, month] = data.split('-');
    */

    const htmlString: string = renderToString(<div>Hallo</div>);
    //const htmlString: string = renderToString(<ExportTable firstName="Johanna" lastName="Scherer" year={2023} month={11}></ExportTable>);
    /*
    generatePDFfromHTML(htmlString, '/out.pdf')
        .then(data => {
            console.log('Generated PDF successfully');
        })
        .catch(err => {
            console.log('An error occurred when creating the PDF')
        });
    */
    console.log(htmlString);
    return new Response(null, {
        status: 200
    });
}

/*
async function generatePDFfromHTML(htmlContent: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
}
*/