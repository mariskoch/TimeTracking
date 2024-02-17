// According to:
// https://nextjs.org/docs/app/building-your-application/routing/internationalization

import {NextRequest} from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export type locale = 'en' | 'de';

const locales: locale[] = ['en', 'de'];
const defaultLocale: locale = 'en';

const HEADER_NAME = 'accept-language';

function getLocale(request: NextRequest): locale {
    const headers: { [key: string]: string | undefined } = {};
    headers[HEADER_NAME] = request.headers.get(HEADER_NAME) || undefined;
    const languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale) as locale;
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // exclude apis
    if (pathnameHasLocale || pathname.startsWith('/api')) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}