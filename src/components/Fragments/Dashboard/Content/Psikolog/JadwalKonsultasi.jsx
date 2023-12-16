import React, { useState } from 'react';

function JadwalKonsultasiPsikolog() {
  const [jadwal, setJadwal] = useState([
    { id: 1, kolom1: 'Data 1', kolom2: 'Data 2', kolom3: 'Data 3', kolom4: 'Data 4' },
    { id: 2, kolom1: 'Data 5', kolom2: 'Data 6', kolom3: 'Data 7', kolom4: 'Data 8' },
  ]);

  const tambahData = () => {
    const newData = {
      id: jadwal.length + 1,
      kolom1: 'Data Baru',
      kolom2: 'Data Baru',
      kolom3: 'Data Baru',
      kolom4: 'Data Baru',
    };
    setJadwal([...jadwal, newData]);
  };

  const hapusData = (id) => {
    const newData = jadwal.filter((data) => data.id !== id);
    setJadwal(newData);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl">
        <div className="mb-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Kolom 1</th>
                <th className="py-2 px-4 border-b">Kolom 2</th>
                <th className="py-2 px-4 border-b">Kolom 3</th>
                <th className="py-2 px-4 border-b">Kolom 4</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((data) => (
                <tr key={data.id}>
                  <td className="py-2 px-4 border-b">{data.kolom1}</td>
                  <td className="py-2 px-4 border-b">{data.kolom2}</td>
                  <td className="py-2 px-4 border-b">{data.kolom3}</td>
                  <td className="py-2 px-4 border-b">{data.kolom4}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => hapusData(data.id)} className="text-red-500">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={tambahData} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Tambah Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default JadwalKonsultasiPsikolog;
