import ExportTable from "@/components/ExportTable";
import HelloComponent from "@/components/HelloComponent";
import puppeteer from "puppeteer";
import fs from 'fs';
import { Readable, Stream, Transform, Writable, pipeline } from "stream";
import { PipeableStream } from "react-dom/server";

export async function POST(request: Request) {
    const ReactDOMServer = (await import('react-dom/server')).default;
    const htmlStream = ReactDOMServer.renderToPipeableStream(<ExportTable firstName="Johanna" lastName="Scherer" month={11} year={2023}></ExportTable>);

    /*
    const readableStream = toReadableStream(htmlStream);

    const htmlString = await streamToString(readableStream);
    */

    const comp = ExportTable({ firstName: "Johanna", lastName: "Scherer", month: 11, year: 2023 });

    console.log(comp);

    const res = new Response(comp?.toString(), {
        status: 200
    });

    return res;
}

/*
function toReadableStream(pipeableStream: PipeableStream): ReadableStream {
    const { readable, writable } = new TransformStream();
    pipeableStream.pipe(writable);
    return readable;
}

async function streamToString(stream: ReadableStream): Promise<string> {
    const decoder = new TextDecoder();
    const reader = stream.getReader();
    let result = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        result += decoder.decode(value);
    }
    return result;
}
*/