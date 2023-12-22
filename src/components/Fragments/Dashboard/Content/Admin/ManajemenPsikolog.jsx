import { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function ManajemenPsikolog() {
  const customStyles = {
    rows: {
      style: {
        fontSize: '13px',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        backgroundColor: '#f5f6ff',
        borderRadius: '10px 10px 0px 0px'
      },
    },
    pagination: {
      style: {
        fontSize: '15px'
      },
    },
  };

  const handleEditClick = (id) => {
    const findData = records.find((data) => data.id === id);
  
    Swal.fire({
      title: "Edit Psikolog",
      html: `
        <div class="grid grid-cols-1 gap-4">
          <label class="block">
            <span class="text-gray-700">Nama Psikolog:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" value="${findData.namaPsikolog}" id="editNamaPsikolog">
          </label>
          <label class="block">
            <span class="text-gray-700">Spesialisasi:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" value="${findData.spesialisasi}" id="editSpesialisasi">
          </label>
          <label class="block">
            <span class="text-gray-700">Email:</span>
            <input type="email" class="mt-1 p-2 w-full border rounded-md" value="${findData.email}" id="editEmail">
          </label>
          <label class="block">
            <span class="text-gray-700">Password:</span>
            <input type="password" class="mt-1 p-2 w-full border rounded-md" value="${findData.password}" id="editPassword">
          </label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle edit logic here
        const editedNamaPsikolog = document.getElementById("editNamaPsikolog").value;
        const editedSpesialisasi = document.getElementById("editSpesialisasi").value;
        const editedEmail = document.getElementById("editEmail").value;
        const editedPassword = document.getElementById("editPassword").value;
  
        // Use the edited data as needed
        console.log("Edited Nama Psikolog:", editedNamaPsikolog);
        console.log("Edited Spesialisasi:", editedSpesialisasi);
        console.log("Edited Email:", editedEmail);
        console.log("Edited Password:", editedPassword);
  
        Swal.fire("Saved!", "", "success");
      }
    });
  };
  

  const handleDeleteClick = (id) => {
    const findData = records.find((data) => data.id === id);
    Swal.fire({
      title: `Hapus Psikolog`,
      text: `Apakah anda yakin ingin menghapus ${findData.namaPsikolog}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle deletion logic here
        Swal.fire({
          title: "Berhasil!",
          text: "Psikolog berhasil dihapus.",
          icon: "success",
        });
      }
    });
  };

  const handleAddClick = () => {
    // You can customize the add action here, for now, just display an alert
    Swal.fire({
      title: "Tambah Psikolog",
      html: `
        <div class="grid grid-cols-1 gap-4">
          <label class="block">
            <span class="text-gray-700">Nama Psikolog:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan nama psikolog" id="namaPsikolog">
          </label>
          <label class="block">
            <span class="text-gray-700">Spesialisasi:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan spesialisasi" id="spesialisasi">
          </label>
          <label class="block">
            <span class="text-gray-700">Email:</span>
            <input type="email" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan email" id="email">
          </label>
          <label class="block">
            <span class="text-gray-700">Password:</span>
            <input type="password" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan password" id="password">
          </label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle submission logic here
        const namaPsikolog = document.getElementById("namaPsikolog").value;
        const spesialisasi = document.getElementById("spesialisasi").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        // Use the collected data as needed
        console.log("Nama Psikolog:", namaPsikolog);
        console.log("Spesialisasi:", spesialisasi);
        console.log("Email:", email);
        console.log("Password:", password);
  
        Swal.fire("Saved!", "", "success");
      }
    });
  };
  

  const columns = [
    {
      name: 'Nama Psikolog (Username)',
      selector: row => row.namaPsikolog,
      sortable: true
    },
    {
      name: 'Spesialisasi',
      selector: row => row.spesialisasi,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Password',
      selector: row => row.password,
      sortable: true
    },
    {
      name: 'Action',
      cell: (d) => [
        <button
          key={`edit-${d.id}`}
          className="focus:outline-none text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          onClick={() => handleEditClick(d.id)}
        >
          Edit
        </button>,
        <button
          key={`delete-${d.id}`}
          className="focus:outline-none text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          onClick={() => handleDeleteClick(d.id)}
        >
          Hapus
        </button>
      ]
    }
  ];
  
  const data = [
    {
      id: 1,
      namaPsikolog: 'Psikolog 1',
      spesialisasi: 'Spesialisasi 1',
      email: 'psikolog1@example.com',
      password: 'password1'
    },
    {
      id: 2,
      namaPsikolog: 'Psikolog 2',
      spesialisasi: 'Spesialisasi 2',
      email: 'psikolog2@example.com',
      password: 'password2'
    },
    {
      id: 3,
      namaPsikolog: 'Psikolog 3',
      spesialisasi: 'Spesialisasi 3',
      email: 'psikolog3@example.com',
      password: 'password3'
    }
  ];
  

  const [records, setRecords] = useState(data);

  function handleFilter(e) {
    const newData = data.filter(row => {
      return row.namaPsikolog.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid grid-rows-1 mb-2">
        <input
          className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2"
          type="text"
          placeholder="Cari Nama Psikolog"
          onChange={handleFilter}
        />
        <button
          type="button"
          className="btn btn-input col-end-10 focus:outline-none text-white bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 mr-2"
          onClick={handleAddClick}
        >
          <i className="bi bi-plus"></i> + Tambah Psikolog
        </button>
      </div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
}

export default ManajemenPsikolog;
