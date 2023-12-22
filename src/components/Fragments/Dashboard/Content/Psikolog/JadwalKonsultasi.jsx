import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function JadwalKonsultasiPsikolog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReview = (row) => {
    setSelectedRow(row);
    Swal.fire({
      title: "Tinjau Konsultasi",
      html: `<p><strong>Nama Pasien:</strong> ${row.nama}</p><p><strong>Keluhan:</strong> ${row.keluhan}</p>`,
      showCancelButton: true,
      confirmButtonText: "Disetujui",
      cancelButtonText: "Ditolak",
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
        handleApprove();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleReject();
      }
    });
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Link Google Meet",
      input: "text",
      inputPlaceholder: "Masukkan Link Google Meet",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      preConfirm: (link) => {
        if (!link) {
          Swal.showValidationMessage("Link tidak boleh kosong");
        }
        return link;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const link = result.value;
        // Proses submit atau simpan data
        // ...
        Swal.fire({
          icon: "success",
          title: "Konsultasi Disetujui",
          text: `Link: ${link}`,
        });
      }
    });
  };

  const handleReject = () => {
    // Proses menolak konsultasi
    // ...
    Swal.fire({
      icon: "info",
      title: "Konsultasi Ditolak",
      text: "Konsultasi telah ditolak.",
    });
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
      name: "Nama Pasien",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Keluhan",
      selector: "keluhan",
      sortable: true,
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
      nama: "Pasien A",
      keluhan: "Stress",
      status: "Perlu Ditinjau",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Pasien B",
      keluhan: "Kecemasan",
      status: "Perlu Ditinjau",
    },
    {
      tanggal: "12/12/2021",
      jam: "12.00",
      nama: "Pasien C",
      keluhan: "Depresi",
      status: "Ditolak",
    },
  ];

  const renderAction = (row) => {
    switch (row.status) {
      case "Perlu Ditinjau":
        return (
          <button
            onClick={() => handleReview(row)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Tinjau
          </button>
        );
      case "Ditolak":
        return (
          <button className="px-4 py-2 text-gray-600 bg-gray-300 rounded" disabled>
            Tinjau
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
        title="Jadwal Konsultasi Psikolog"
        columns={tableHead}
        data={filteredData}
        pagination
      />
    </div>
  );
}

export default JadwalKonsultasiPsikolog;