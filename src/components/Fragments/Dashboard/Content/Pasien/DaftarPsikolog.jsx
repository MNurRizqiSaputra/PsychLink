import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";

function DaftarPsikologPasien() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [psikologData, setPsikologData] = useState([]);

  useEffect(() => {
    // Retrieve the user data JSON string from local storage
    const storedUserDataString = localStorage.getItem("user");
  
    if (!storedUserDataString) {
      // Handle the case where the user data is not found in local storage
      console.error("User data not found in local storage.");
      return;
    }
  
    try {
      // Parse the JSON string into a JavaScript object
      const storedUserData = JSON.parse(storedUserDataString);
  
      // Fetch user data from the JSON file using Axios
      axios.get("http://localhost:3000/users")
        .then((response) => {
          console.log("Fetched Data:", response.data);
  
          // Find the logged-in user from the fetched data
          const user = response.data.find((userData) => userData.id === storedUserData.id);
  
          if (!user) {
            // Handle the case where the user is not found
            console.error("Logged-in user not found in the fetched data.");
            return;
          }
  
          // Set the logged-in user to state
          setLoggedInUser(user);
  
          // Filter psikolog data from fetched users
          const psikologs = response.data.filter((userData) => userData.role === "psikolog");
          setPsikologData(psikologs);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (error) {
      // Handle the case where JSON parsing fails
      console.error("Error parsing user data from local storage:", error);
    }
  }, []);
  

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleConsultation = (row) => {
    axios.get("http://localhost:3000/konsultasis")
      .then((response) => {
        const existingConsultations = response.data;
        
        // Find the next available consultation ID
        const newConsultationId = existingConsultations.length > 0
          ? Math.max(...existingConsultations.map((consultation) => consultation.id)) + 1
          : 1;
  
        Swal.fire({
          title: `Ajukan Konsultasi dengan ${row.username}`,
          html: `
            <div class="bg-white p-4 rounded-md shadow-md">
              <form>
                <div class="mb-4">
                  <label for="tanggal" class="block text-sm font-medium text-gray-700">Tanggal Konsultasi:</label>
                  <input type="date" id="tanggal" name="tanggal" class="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
    
                <div class="mb-4">
                  <label for="jam" class="block text-sm font-medium text-gray-700">Jam Konsultasi:</label>
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
            const tanggal = Swal.getPopup().querySelector("#tanggal").value;
            const jam = Swal.getPopup().querySelector("#jam").value;
            const keluhan = Swal.getPopup().querySelector("#keluhan").value;
    
            const errors = {};
    
            if (!tanggal || !jam || !keluhan) {
              errors.general = "Pastikan semua data konsultasi terisi";
            }
    
            if (Object.keys(errors).length > 0) {
              Swal.showValidationMessage(Object.values(errors).join("<br>"));
              return false; // Prevent the form from being submitted
            }
    
            const newConsultation = {
              id: newConsultationId,
              pasienId: loggedInUser.id,
              psikologId: row.id,
              tanggal,
              jam,
              keluhan,
              status: "Menunggu",
              linkGoogleMeet: "",
            };
    
            axios.post("http://localhost:3000/konsultasis", newConsultation)
              .then((response) => {
                console.log("Consultation Submitted:", response.data);
    
                axios.get("http://localhost:3000/users")
                  .then((response) => {
                    const psikologs = response.data.filter((user) => user.role === "psikolog");
                    setPsikologData(psikologs);
                  })
                  .catch((error) => {
                    console.error("Error fetching updated user data:", error);
                  });
    
                Swal.fire({
                  title: "Konsultasi Diajukan!",
                  icon: "success",
                });
              })
              .catch((error) => {
                console.error("Error submitting consultation:", error);
              });
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching existing consultations:", error);
      });
  };
  
  

  const tableHead = [
    {
      name: "Nama Psikolog",
      selector: "username",
      sortable: true,
    },
    {
      name: "Spesialisasi",
      selector: "spesialisasi",
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button
          onClick={() => handleConsultation(row)}
          className="px-4 py-2 font-bold text-white transition-colors bg-green-500 rounded hover:bg-green-700"
        >
          Konsultasi
        </button>
      ),
    },
  ];

  const filteredData = psikologData.filter((row) =>
    row.username.toLowerCase().includes(searchTerm.toLowerCase())
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
