import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function JadwalKonsultasiPasien() {
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
      name: "Nama Psikolog",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => renderStatus(row.status),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => renderAction(row),
    },
  ];

  const tableData = [
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Aji",
      status: "Menunggu",
      link: "",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Budiman",
      status: "Disetujui",
      link: "https://meet.google.com/xyz",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Dr. Cahya",
      status: "Ditolak",
      link: "https://meet.google.com/abc",
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
      case "Ditolak":
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

  const renderAction = (row) => {
    switch (row.status) {
      case "Disetujui":
        return (
          <button
            onClick={() => handleViewLink(row.link)}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
          >
            View Link Google Meet
          </button>
        );
      case "Menunggu":
      case "Ditolak":
        return (
          <button className="px-4 py-2 text-gray-600 bg-gray-300 rounded" disabled>
            View Link Google Meet
          </button>
        );
      default:
        return null;
    }
  };

  const handleViewLink = (link) => {
    // Use SweetAlert2 to show the Google Meet link
    Swal.fire({
      icon: "info",
      title: "Google Meet Link",
      text: `Link: ${link}`,
    });
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
        title="Jadwal Konsultasi Pasien"
        columns={tableHead}
        data={filteredData}
        pagination
      />
    </div>
  );
}

export default JadwalKonsultasiPasien;