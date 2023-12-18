function DaftarPsikologPasien() {
  const tableHead = [
    {
      name: "Nama Psikolog",
      key: "nama",
    },
    {
      name: "Jenis Kelamin",
      key: "jenisKelamin",
    },
    {
      name: "Spesialisasi",
      key: "spesialisasi",
    },
    {
      name: "Status",
      key: "status",
    },
  ];

  const tableData = [
    {
      nama: "Dr. Aji",
      jenisKelamin: "Laki-laki",
      spesialisasi: "Psikolog Anak",
      status: "Tersedia",
    },
    {
      nama: "Dr. Budiman",
      jenisKelamin: "Laki-laki",
      spesialisasi: "Psikolog Remaja",
      status: "Tersedia",
    },
    {
      nama: "Dr. Cahya",
      jenisKelamin: "Perempuan",
      spesialisasi: "Psikolog Dewasa",
      status: "Tidak Tersedia",
    },
  ];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {tableHead.map((head) => (
                <th key={head.key} scope="col" className="px-6 py-3">
                  {head.name}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.nama}>
                <td className="px-6 py-4 whitespace-nowrap">{row.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.jenisKelamin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.spesialisasi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.status === "Tersedia" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {row.status}
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {row.status}
                    </span>
                  )}
                </td>
                <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                  <button
                    disabled={row.status !== "Tersedia"}
                    onClick={() => alert(`Konsultasi dengan ${row.nama}`)}
                    className={`bg-green-500 hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded ${
                      row.status !== "Tersedia" &&
                      "bg-opacity-50 cursor-not-allowed hover:bg-green-500/50"
                    }`}
                  >
                    Konsultasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DaftarPsikologPasien;
