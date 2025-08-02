import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = cookies();

    // Hapus token dari cookie
    cookieStore.set('token', '', {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 0, // expired segera
    });

    return NextResponse.json({ message: 'Logout successful' });
}
