import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import { getOrCreatePortfolioStorage } from "./models/server/storageSetup";
export async function middleware(request: NextRequest){
     await Promise.all([
        getOrCreateDB(),
        getOrCreatePortfolioStorage(),
     ])
    return NextResponse.next()
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
}