import ExportTable from "@/components/ExportTable";
import HelloComponent from "@/components/HelloComponent";
import puppeteer from "puppeteer";
import fs from 'fs';
import { Readable, Stream, Transform, Writable, pipeline } from "stream";

export async function POST(request: Request) {
    const ReactDOMServer = (await import('react-dom/server')).default;
    const htmlStream = await ReactDOMServer.renderToPipeableStream(<ExportTable firstName="Johanna" lastName="Scherer" month={11} year={2023}></ExportTable>, {
        onShellReady: () => {
            htmlStream.pipe(process.stdout);
        }
    });
    
    const res = new Response(null, {
        status: 200
    });
    return res;
}
