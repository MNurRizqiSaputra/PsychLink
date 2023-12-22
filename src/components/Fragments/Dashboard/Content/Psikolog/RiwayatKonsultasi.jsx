import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function RiwayatKonsultasiPsikolog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFinishConsultation = (row) => {
    setSelectedRow(row);
    Swal.fire({
      title: "Selesaikan Konsultasi?",
      text: "Apakah Anda yakin ingin menyelesaikan konsultasi ini?",
      showCancelButton: true,
      confirmButtonText: "Klik untuk Selesai",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: (result) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSetStatusSelesai();
      }
    });
  };

  const handleSetStatusSelesai = () => {
    // Proses menyelesaikan konsultasi
    // ...
    Swal.fire({
      icon: "success",
      title: "Konsultasi Selesai",
      text: "Konsultasi telah selesai.",
    });
    // Disini tambahkan logika untuk mengubah status konsultasi menjadi "Selesai"
    // Misalnya: panggil fungsi atau kirim permintaan API untuk mengubah status
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
      name: "Nama Pasien (Username)",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Keluhan",
      selector: "keluhan",
      sortable: true,
    },
    {
      name: "Link Google Meet",
      selector: "link",
      sortable: true,
      cell: (row) => renderLinkCell(row.link),
    },
    {
      name: "Status",
      selector: "status",
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
      nama: "Pasien A (pasienA)",
      keluhan: "Stress",
      link: "https://meet.google.com/xyz",
      status: "Disetujui",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Pasien B (pasienB)",
      keluhan: "Kecemasan",
      link: "https://meet.google.com/abc",
      status: "Selesai",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Pasien C (pasienC)",
      keluhan: "Depresi",
      link: "https://meet.google.com/pqr",
      status: "Disetujui",
    },
  ];

  const renderLinkCell = (link) => (
    <div style={{ whiteSpace: "pre-wrap" }}>{link}</div>
  );

  const renderAction = (row) => {
    switch (row.status) {
      case "Disetujui":
        return (
          <button
            onClick={() => handleFinishConsultation(row)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Klik untuk Selesai
          </button>
        );
      case "Selesai":
        return (
          <button className="px-4 py-2 text-gray-600 bg-gray-300 rounded" disabled>
            Klik untuk Selesai
          </button>
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
        placeholder="Cari Nama Pasien"
        onChange={handleFilter}
      />
      <DataTable
        title="Riwayat Konsultasi Psikolog"
        columns={tableHead}
        data={filteredData}
        pagination
      />
    </div>
  );
}

export default RiwayatKonsultasiPsikolog;