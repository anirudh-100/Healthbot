'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DoctorRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    experience: '',
    hospital: '',
    licenseNumber: '',
    address: '',
    consultationFee: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!Object.values(formData).every(field => field.trim() !== '')) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(formData.fullName)) {
      setError('Full Name should contain only letters');
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Phone Number should be exactly 10 digits');
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9]+@gmail\.com$/.test(formData.email)) {
      setError('Email should be a valid Gmail address');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/doctors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register');
      }

      router.push('/dashboard'); // Redirect after successful registration
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="flex justify-between items-center min-h-screen bg-gray-900 p-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      {/* Form Section */}
      <div className="w-1/2 bg-white p-10 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-10 border border-gray-700">
        <motion.h2 
          className="text-3xl font-bold text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Doctor Registration
        </motion.h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="email" name="email" placeholder="Email (must be @gmail.com)" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="tel" name="phone" placeholder="Phone Number (10 digits)" onChange={handleChange} required />
          <select className="w-full p-3 border rounded-lg bg-gray-800 text-white" name="specialization" onChange={handleChange} required>
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Neurologist">Neurologist</option>
          </select>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="text" name="hospital" placeholder="Hospital/Clinic Name" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white" type="number" name="consultationFee" placeholder="Consultation Fee ($)" onChange={handleChange} required />
          <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
      {/* Image Section */}
      <div className="w-1/2 flex justify-center items-center">
        <img src="/doctor_registration.avif" alt="Doctor Registration" className="rounded-xl shadow-lg w-3/4 h-[500px] object-cover" />
      </div>
    </motion.div>
  );
}
