import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";

function RiwayatKonsultasiPasien() {
  const [searchTerm, setSearchTerm] = useState("");
  const [konsultasiData, setKonsultasiData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const konsultasiResponse = await axios.get("http://localhost:3000/konsultasis");
        const userDataResponse = await axios.get("http://localhost:3000/users");

        setKonsultasiData(konsultasiResponse.data);
        setUserData(userDataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const getUserNameById = (userId) => {
    const user = userData.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
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
      selector: "psikologId",
      cell: (row) => getUserNameById(row.psikologId),
      sortable: true,
    },
    {
      name: "Keluhan",
      selector: "keluhan",
      sortable: true,
      grow: 2, // Adjust the value based on your layout and preferences
      wrap: true, // Wrap the content to the next line if it's too long
    },
    {
      name: "Message",
      selector: "status",
      cell: (row) => renderMessage(row.status),
      sortable: false,
    },
    {
      name: "Status",
      cell: (row) => renderStatus(row.status),
      sortable: true,
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

  const renderMessage = (status) => {
    switch (status) {
      case "Menunggu":
        return <span>Harap ditunggu, permintaan konsul anda sedang ditinjau</span>;
      case "Disetujui":
        return <span>Jangan lupa jadwal konsul Anda ya!</span>;
      case "Ditolak":
        return <span>Maaf konsul Anda ditolak oleh psikolog</span>;
      case "Selesai":
        return <span>Konsul Anda telah selesai, terima kasih</span>;
      default:
        return null;
    }
  };

  const userConsultationData = konsultasiData.filter((row) => loggedInUser && row.pasienId === loggedInUser.id);

  const filteredData = userConsultationData.filter((row) =>
    getUserNameById(row.psikologId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <input
        className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2 mb-3"
        type="text"
        placeholder="Cari Nama Psikolog"
        onChange={handleFilter}
      />
      {userConsultationData.length > 0 ? (
        <DataTable
          title="Riwayat Konsultasi Pasien"
          columns={tableHead}
          data={filteredData}
          pagination
        />
      ) : (
        <p className="text-center">Belum ada riwayat konsultasi</p>
      )}
    </div>
  );
}

export default RiwayatKonsultasiPasien;
