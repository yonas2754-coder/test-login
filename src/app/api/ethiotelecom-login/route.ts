// app/api/ethiotelecom-login/route.ts (Next.js 13+ app router)
import { NextRequest, NextResponse } from 'next/server';
import { getUserName } from 'ethiotelecom-login-util-js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    console.log(`Attempting login for: ${username}...`);

    const fullName: string = await getUserName(username, password);

    console.log('✅ Login Successful!');
    console.log(`Authenticated User Name: ${fullName}`);

    return NextResponse.json({ fullName });
  } catch (error: any) {
    console.error('❌ Authentication Failed.');
    console.error(error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
