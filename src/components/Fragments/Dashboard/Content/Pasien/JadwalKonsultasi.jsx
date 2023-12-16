function JadwalKonsultasiPasien() {
  const tableHead = [
    {
      name: "Tanggal Konsultasi",
      key: "tanggal",
    },
    {
      name: "Jam Konsultasi",
      key: "jam",
    },
    {
      name: "Nama Psikolog",
      key: "nama",
    },
    {
      name: "Status",
      key: "status",
    },
  ];

  const tableData = [
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Aji",
      status: "Menunggu",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Budiman",
      status: "Disetujui",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Cahya",
      status: "Selesai",
    },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case "Menunggu":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {status}
          </span>
        );
      case "Disetujui":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {status}
          </span>
        );
      case "Selesai":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {status}
          </span>
        );
      default:
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {status}
          </span>
        );
    }
  };

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
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.nama}>
                <td className="px-6 py-4 whitespace-nowrap">{row.tanggal}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.jam}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatus(row.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JadwalKonsultasiPasien;
