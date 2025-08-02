'use client';
import { useEffect, useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile
                const profileRes = await fetch('/api/profile');
                const profileData = await profileRes.json();

                // Fetch projects
                const projectsRes = await fetch('/api/projects');
                const projectsData = await projectsRes.json();

                // Cek error
                if (!profileRes.ok) throw new Error(profileData.message);
                if (!projectsRes.ok) throw new Error(projectsData.message);

                // Set state
                setProfile(profileData);
                setProjects(projectsData);
            } catch (err: any) {
                setError(err.message || 'Failed to load data');
            }
        };

        fetchData();
    }, []);


    if (error) return <p className="text-red-600 p-4">{error}</p>;
    if (!profile) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Overview</h1>
                <LogoutButton />
            </div>

            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
                    <div className="absolute top-20 left-6">
                        <img
                            src={profile.avatar}
                            className="w-24 h-24 rounded-full border-4 border-white"
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className="mt-14 ml-32">
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-gray-500">@{profile.email}</p>
                </div>
                <div className="mt-6 border-b border-gray-200">
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About Me */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">About Me</h3>
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>ROLE :</strong> {profile.role}</p>
                        <p><strong>Created At:</strong> {profile.creationAt}</p>
                        <p><strong>EMAIL:</strong> {profile.email}</p>
                        <p><strong>Updated At:</strong> {profile.updatedAt}</p>
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-white rounded-xl shadow p-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Products Overview</h3>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">Owner</th>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Brand</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="px-4 py-2">{item.owner_name}</td>
                                    <td className="px-4 py-2">{item.product_name}</td>
                                    <td className="px-4 py-2">{item.product_brand}</td>
                                    <td className="px-4 py-2">
                                        {new Date(item.product_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}