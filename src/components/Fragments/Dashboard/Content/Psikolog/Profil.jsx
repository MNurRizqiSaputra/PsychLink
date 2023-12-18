import React from 'react';
import { FaBriefcase, FaInfoCircle } from 'react-icons/fa';

const ProfilPsikolog = () => {
  const psikologData = {
    nama: 'Dr. Andri',
    spesialisasi: 'Psikoterapi',
    pengalaman: 'Berpengalaman lebih dari 1 minggu dalam bidang psikologi klinis.',
    deskripsi: 'Seorang psikolog berpengalaman yang cukup ahli. Mendedikasikan diri untuk membantu individu mengatasi tantangan mental dan emosional.'
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gradient-to-r from-blue-900 to-blue-500 rounded-lg shadow-md text-white">
      <div className="flex items-center justify-center mb-4">
        <img src="https://placekitten.com/200/200" alt="Profil Psikolog" className="rounded-full h-32 w-32 object-cover border-4 border-purple-700" />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{psikologData.nama}</h2>
        <p className="text-lg">{psikologData.spesialisasi}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <FaBriefcase className="text-xl mr-2" />
          <h3 className="text-lg font-semibold">Pengalaman</h3>
        </div>
        <p className="text-lg">{psikologData.pengalaman}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <FaInfoCircle className="text-xl mr-2" />
          <h3 className="text-lg font-semibold">Deskripsi</h3>
        </div>

        <p className="text-lg">{psikologData.deskripsi}</p>
      </div>
    </div>
  );
};

export default ProfilPsikolog;
