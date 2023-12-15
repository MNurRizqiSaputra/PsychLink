import React from 'react';
  const RiwayatKonsultasiPsikolog = () => {

    const data = React.useMemo(
      () => [
        { id: 1, tanggal: '2023-01-01', dokter: 'Dr. A', diagnosis: 'Flu' },
        { id: 2, tanggal: '2023-02-15', dokter: 'Dr. B', diagnosis: 'Demam' },
        { id: 3, tanggal: '2023-03-22', dokter: 'Dr. C', diagnosis: 'Sakit Kepala' },
      ],
      []
    );
  
    return (
      <div className="container mx-auto mt-8">
        <table className="min-w-full bg-white-950 border border-gray-600">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
              <th className="py-2 px-4 border-b">Dokter</th>
              <th className="py-2 px-4 border-b">Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-4 border-b">{row.id}</td>
                <td className="py-2 px-4 border-b">{row.tanggal}</td>
                <td className="py-2 px-4 border-b">{row.dokter}</td>
                <td className="py-2 px-4 border-b">{row.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default RiwayatKonsultasiPsikolog;