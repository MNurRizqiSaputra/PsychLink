import React, { useState } from "react";
import DataTable from "react-data-table-component";

function RiwayatKonsultasiPasien() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const tableHead = [
    {
      name: "Tanggal Konsultasi",
      selector: "tanggal",
      sortable: true,
    },
    {
      name: "Jam Konsultasi",
      selector: "jam",
      sortable: true,
    },
    {
      name: "Nama Psikolog (Username)",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => renderStatus(row.status),
      sortable: true,
    },
  ];

  const tableData = [
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Aji (aji_psikolog)",
      status: "Selesai",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Budiman (budiman_psikolog)",
      status: "Disetujui",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Cahya (cahya_psikolog)",
      status: "Selesai",
    },
  ];

  const renderStatus = (status) => {
    switch (status) {
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
        return null;
    }
  };

  const filteredData = tableData.filter((row) =>
    row.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <input
        className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2 mb-3"
        type="text"
        placeholder="Cari Nama Psikolog"
        onChange={handleFilter}
      />
      <DataTable
        title="Riwayat Konsultasi Pasien"
        columns={tableHead}
        data={filteredData}
        pagination
      />
    </div>
  );
}

export default RiwayatKonsultasiPasien;