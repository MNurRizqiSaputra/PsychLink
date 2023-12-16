import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const BantuanPsikolog = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
      <div className="flex items-center mb-4">
        <FaEnvelope className="text-blue-500 mr-2" />
        <p className="text-gray-700">
          Email: <span className="font-semibold">support@gmail.com</span>
        </p>
      </div>
      <div className="flex items-center">
        <FaPhone className="text-blue-500 mr-2" />
        <p className="text-gray-700">
          Telepon: <span className="font-semibold">(123) 456-7890</span>
        </p>
      </div>
    </div>
  );
};

export default BantuanPsikolog;