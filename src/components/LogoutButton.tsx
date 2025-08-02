'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-semibold hover:underline transition"
        >
            <LogOut size={16} />
            Logout
        </button>
    );
}
