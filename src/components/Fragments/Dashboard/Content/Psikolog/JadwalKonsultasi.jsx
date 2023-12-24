import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function JadwalKonsultasiPsikolog() {
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
        const konsultasiResponse = await fetch("http://localhost:3000/konsultasis");
        const userDataResponse = await fetch("http://localhost:3000/users");

        const konsultasiData = await konsultasiResponse.json();
        const userData = await userDataResponse.json();

        setKonsultasiData(konsultasiData);
        setUserData(userData);
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
    const user = userData.find(user => user.id === userId);
    return user ? user.username : 'Unknown User';
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
      selector: "pasienId",
      cell: (row) => getUserNameById(row.pasienId),
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
      name: "Status",
      cell: (row) => renderStatus(row.status),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => renderAction(row),
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
      case "Menunggu":
        return (
          <button
            onClick={() => handleReview(row)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Tinjau
          </button>
        );
      default:
        return (
          <button className="px-4 py-2 text-gray-600 bg-gray-300 rounded" disabled>
            Tinjau
          </button>
        );
    }
  };
  
  const handleReview = async (row) => {
    if (row.status === "Menunggu") {
      Swal.fire({
        title: 'Review Konsultasi',
        html: `<p><strong>Nama Pasien:</strong> ${getUserNameById(row.pasienId)}</p><p><strong>Tanggal Konsultasi:</strong> ${row.tanggal}</p><p><strong>Jam Konsultasi:</strong> ${row.jam}</p>
      <p><strong>Keluhan:</strong> ${row.keluhan}</p>`,
        text: 'Pilih aksi untuk konsultasi ini:',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Disetujui',
        cancelButtonText: 'Ditolak',
        cancelButtonColor: '#d33',
        showDenyButton: true, // Add the Cancel button
        denyButtonText: 'Batal',
        denyButtonColor: '#808080', // Set the color to gray
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleApproval(row);
        } else if (result.isDenied) {
          await handleCancel(row);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Konfirmasi Penolakan',
            text: 'Apakah Anda yakin ingin menolak konsultasi ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
          }).then(async (result) => {
            if (result.isConfirmed) {
              await handleRejection(row);
            }
          });
        }
      });
    }
  };
  
  
  const handleApproval = async (row) => {
    Swal.fire({
      title: 'Review Disetujui',
      html: `
        <label for="googleMeetLink" class="block text-sm font-medium text-gray-700">Link Google Meet:</label>
        <input type="text" id="googleMeetLink" class="mt-1 p-2 border border-gray-300 rounded-md">
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const googleMeetLink = document.getElementById('googleMeetLink').value.trim();
  
        if (!googleMeetLink) {
          Swal.fire('Error', 'Link Google Meet tidak boleh kosong.', 'error');
          return;
        }
  
        const response = await fetch(`http://localhost:3000/konsultasis/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...row,
            status: 'Disetujui',
            linkGoogleMeet: googleMeetLink,
          }),
        });
  
        if (response.ok) {
          const updatedData = konsultasiData.map((item) =>
            item.id === row.id ? { ...item, status: 'Disetujui', linkGoogleMeet: googleMeetLink } : item
          );
          setKonsultasiData(updatedData);
          Swal.fire('Success!', 'Konsultasi telah disetujui.', 'success');
        } else {
          console.error('Error updating data');
          Swal.fire('Error', 'Terjadi kesalahan saat memproses permintaan.', 'error');
        }
      }
    });
  };
  
  const handleRejection = async (row) => {
    const response = await fetch(`http://localhost:3000/konsultasis/${row.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...row,
        status: 'Ditolak',
      }),
    });

    if (response.ok) {
      const updatedData = konsultasiData.map((item) =>
        item.id === row.id ? { ...item, status: 'Ditolak' } : item
      );
      setKonsultasiData(updatedData);
      Swal.fire('Success!', 'Konsultasi telah ditolak.', 'success');
    } else {
      console.error('Error updating data');
      Swal.fire('Error', 'Terjadi kesalahan saat memproses permintaan.', 'error');
    }
  };

  const filteredData = konsultasiData.filter(
    (row) => loggedInUser && row.psikologId === loggedInUser.id
  );

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <input
        className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2 mb-3"
        type="text"
        placeholder="Cari Nama Pasien"
        onChange={handleFilter}
      />
      {filteredData.length > 0 ? (
        <DataTable
          title="Jadwal Konsultasi Psikolog"
          columns={tableHead}
          data={filteredData}
          pagination
        />
      ) : (
        <p className="text-center">Tidak ada konsultasi untuk ditinjau</p>
      )}
    </div>
  );
}

export default JadwalKonsultasiPsikolog;
