// app/api/login/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const rawText = await res.text();
        console.log('Response:', rawText);

        if (!res.ok) {
            return NextResponse.json({ message: 'Invalid credentials', error: rawText }, { status: 401 });
        }

        const data = JSON.parse(rawText);
        const token = data.access_token;

        const cookieStore = cookies(); 
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60, 
        });

        return NextResponse.json({ message: 'Login success' });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
