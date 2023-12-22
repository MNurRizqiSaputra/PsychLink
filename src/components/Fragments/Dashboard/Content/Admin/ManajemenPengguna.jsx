import { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function ManajemenPengguna() {
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
    const foundedName = findData.namaPasien;
    const foundedEmail = findData.email;

    Swal.fire({
      title: "Mengedit Pasien",
      html: `
        <div class="grid grid-cols-1 gap-4">
          <label class="block">
            <span class="text-gray-700">Nama Pasien:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" value="${foundedName}" id="editNamaPasien">
          </label>
          <label class="block">
            <span class="text-gray-700">Email:</span>
            <input type="email" class="mt-1 p-2 w-full border rounded-md" value="${foundedEmail}" id="editEmail">
          </label>
          <label class="block">
            <span class="text-gray-700">Password:</span>
            <input type="password" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan password" id="editPassword">
          </label>
        </div>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const editedNamaPasien = document.getElementById("editNamaPasien").value;
        const editedEmail = document.getElementById("editEmail").value;
        const editedPassword = document.getElementById("editPassword").value;

        if (editedNamaPasien === "" || editedEmail === "") {
          Swal.showValidationMessage("Pastikan nama dan email pasien terisi");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle edit logic here
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  const handleDeleteClick = (id) => {
    const findData = records.find((data) => data.id === id);
    const foundedName = findData.namaPasien;
    
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${foundedName}?`,
      text: "Anda tidak bisa membatalkan penghapusan!",
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
          text: "Pasien berhasil dihapus.",
          icon: "success",
        });
      }
    });
  };

  const handleAddClick = () => {
    Swal.fire({
      title: "Menambah Pasien",
      html: `
        <div class="grid grid-cols-1 gap-4">
          <label class="block">
            <span class="text-gray-700">Nama Pasien:</span>
            <input type="text" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan nama pasien" id="addNamaPasien">
          </label>
          <label class="block">
            <span class="text-gray-700">Email:</span>
            <input type="email" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan email pasien" id="addEmail">
          </label>
          <label class="block">
            <span class="text-gray-700">Password:</span>
            <input type="password" class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan password" id="addPassword">
          </label>
        </div>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const addedNamaPasien = document.getElementById("addNamaPasien").value;
        const addedEmail = document.getElementById("addEmail").value;
        const addedPassword = document.getElementById("addPassword").value;

        if (addedNamaPasien === "" || addedEmail === "") {
          Swal.showValidationMessage("Pastikan nama dan email pasien terisi");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle submission logic here
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  const columns = [
    {
      name: 'Nama Pasien (Username)',
      selector: row => row.namaPasien,
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
      namaPasien: 'Pasien 1',
      email: 'emailpasien1@gmail.com',
      password: 'password1'
    },
    {
      id: 2,
      namaPasien: 'Pasien 2',
      email: 'emailpasien2@gmail.com',
      password: 'password2'
    },
    {
      id: 3,
      namaPasien: 'Pasien 3',
      email: 'emailpasien3@gmail.com',
      password: 'password3'
    }
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(e) {
    const newData = data.filter(row => {
      return row.namaPasien.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid grid-rows-1 mb-2">
        <input className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2" type="text" placeholder="Cari Nama Pasien" onChange={handleFilter}/>
        <button type="button" className="btn btn-input col-end-10 focus:outline-none text-white bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 mr-2" onClick={() => {handleAddClick()}}>
          <i className="bi bi-plus"></i> + Tambah Pasien
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

export default ManajemenPengguna;