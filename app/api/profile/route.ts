// app/api/profile/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies(); // ✅
    const token = cookieStore.get('token')?.value;


    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json({ message: 'Failed to fetch profile' }, { status: res.status });
        }

        const profile = await res.json();
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
