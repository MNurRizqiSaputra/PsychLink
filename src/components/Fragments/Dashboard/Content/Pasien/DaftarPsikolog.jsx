import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";

function DaftarPsikologPasien() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve the username of the logged-in user from local storage
    const storedUsername = localStorage.getItem("username");

    // Fetch user data from the JSON file using Axios
    axios.get("http://localhost:3000/users") // Adjust the endpoint to your server
      .then((response) => {
        console.log("Fetched Data:", response.data);

        // Find the logged-in user from the fetched data
        const user = response.data.find((user) => user.username === storedUsername);
        console.log("Logged In User:", user);

        // Set the logged-in user to state
        setLoggedInUser(user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleConsultation = (row) => {
    Swal.fire({
      title: `Ajukan Konsultasi dengan ${row.nama}`,
      html: `
        <div class="bg-white p-4 rounded-md shadow-md">
          <div class="mb-4">
            <label for="namaPasien" class="block text-sm font-medium text-gray-700">Nama Pasien:</label>
            <input type="text" id="namaPasien" name="namaPasien" value="${loggedInUser ? loggedInUser.username : ''}" class="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" readonly>
          </div>

          <form>
            <div class="mb-4">
              <label for="tanggal" class="block text-sm font-medium text-gray-700">Tanggal:</label>
              <input type="date" id="tanggal" name="tanggal" class="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>

            <div class="mb-4">
              <label for="jam" class="block text-sm font-medium text-gray-700">Jam:</label>
              <input type="time" id="jam" name="jam" class="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>

            <div class="mb-4">
              <label for="keluhan" class="block text-sm font-medium text-gray-700">Keluhan:</label>
              <textarea id="keluhan" name="keluhan" rows="4" class="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required></textarea>
            </div>
          </form>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Ajukan Konsul",
      cancelButtonText: "Batal",
      preConfirm: () => {
        // Handle form submission here
        const tanggal = Swal.getPopup().querySelector("#tanggal").value;
        const jam = Swal.getPopup().querySelector("#jam").value;
        const keluhan = Swal.getPopup().querySelector("#keluhan").value;

        // Perform the necessary actions with the form data
        console.log("Nama Pasien:", loggedInUser ? loggedInUser.username : '');
        console.log("Tanggal:", tanggal);
        console.log("Jam:", jam);
        console.log("Keluhan:", keluhan);

        // For now, just show a success message
        Swal.fire({
          title: "Konsultasi Diajukan!",
          icon: "success",
        });
      },
    });
  };

  const tableHead = [
    {
      name: "Nama Psikolog",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Spesialisasi",
      selector: "spesialisasi",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button
          disabled={row.status !== "Tersedia"}
          onClick={() => handleConsultation(row)}
          className={`bg-green-500 hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded ${
            row.status !== "Tersedia" &&
            "bg-opacity-50 cursor-not-allowed hover:bg-green-500/50"
          }`}
        >
          Konsultasi
        </button>
      ),
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
        title="Daftar Psikolog Pasien"
        columns={tableHead}
        data={filteredData}
        pagination
      />
    </div>
  );
}

export default DaftarPsikologPasien;