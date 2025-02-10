'use client';

import React, { useState } from 'react';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EditProfile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dob: '',
    gender: 'Male',
    avatar: '/default-avatar.png',
    notifications: true,
    darkMode: false,
  });

  const handleSave = async () => {
    await fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    router.push('/dashboards');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="flex items-center mb-4">
        <FiArrowLeft size={24} className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="text-2xl font-semibold ml-4">Edit Profile</h2>
      </div>

      {/* Profile Picture */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image src={profile.avatar} alt="Avatar" width={96} height={96} className="rounded-full border-4 border-purple-500" />
        <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer">
          <FiUpload size={18} />
          <input type="file" className="hidden" />
        </label>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <input type="text" placeholder="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Phone Number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full p-2 border rounded" />
        <input type="date" placeholder="Date of Birth" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="w-full p-2 border rounded" />
        
        <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full p-2 border rounded">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        {/* Settings */}
        <div className="flex items-center justify-between">
          <label>Enable Notifications</label>
          <input type="checkbox" checked={profile.notifications} onChange={() => setProfile({ ...profile, notifications: !profile.notifications })} />
        </div>

        <div className="flex items-center justify-between">
          <label>Dark Mode</label>
          <input type="checkbox" checked={profile.darkMode} onChange={() => setProfile({ ...profile, darkMode: !profile.darkMode })} />
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="w-full p-2 bg-purple-600 text-white rounded flex items-center justify-center">
          <FiSave className="mr-2" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
