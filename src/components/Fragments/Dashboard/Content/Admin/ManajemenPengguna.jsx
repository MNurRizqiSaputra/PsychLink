import { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function ManajemenPengguna() {
  const customStyles = {    
    rows: {
      style: {
        fontSize: '13px',
        // backgroundColor: '#f2f4fa'
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
    // console.log(`You clicked me! ${id}`);
    const findData = data.find((data) => data.id === id);
    const foundedName = findData.namaPengguna
    const foundedEmail = findData.email
    console.log(findData)
    Swal.fire({
      title: "Mengedit Pengguna",
      html:
      '<p> Nama Pengguna </p>' +
      `<input id="swal-input1" class="w-3/4 swal2-input mt-2 mb-3 text-base" value=${foundedName}>` +
      '<p> Email Pengguna </p>' +
      `<input id="swal-input2" class="w-3/4 swal2-input mt-2 text-base" value=${foundedEmail}>`,
      showCancelButton: true,
      preConfirm: () => {
        if (document.getElementById("swal-input1").value == '' || document.getElementById("swal-input2").value == '') {
          Swal.showValidationMessage("Pastikan nama dan email pengguna terisi"); // Show error when validation fails.
          // Swal.enableConfirmButton(); // Enable the confirm button again.
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  };
  const handleDeleteClick = (id) => {
    const findData = data.find((data) => data.id === id);
    const foundedName = findData.namaPengguna
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${foundedName}?`,
      text: "Anda tidak bisa membatalkan penghapusan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Berhasil!",
          text: "Pengguna berhasil dihapus.",
          icon: "success"
        });
      }
    });
  };
  const handleAddClick = () => {
    Swal.fire({
      title: "Menambah Pengguna",
      html:
      '<p> Nama Pengguna </p>' +
      `<input id="swal-input1" class="w-3/4 swal2-input mt-2 mb-3 text-base" placeHolder="Masukkan nama pengguna">` +
      '<p> Email Pengguna </p>' +
      `<input id="swal-input2" class="w-3/4 swal2-input mt-2 text-base" placeHolder="Masukkan email pengguna">`,
      showCancelButton: true,
      preConfirm: () => {
        if (document.getElementById("swal-input1").value == '' || document.getElementById("swal-input2").value == '') {
          Swal.showValidationMessage("Pastikan nama dan email pengguna terisi"); // Show error when validation fails.
          // Swal.enableConfirmButton(); // Enable the confirm button again.
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  };
  
  const columns = [
    {
      name: 'Nama Pengguna',
      selector: row => row.namaPengguna,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Action',
      cell: (d) => [
        <button
          key={d.id}
          className="focus:outline-none text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          onClick={() => {handleEditClick(d.id)}}
        >
          Edit
        </button>,
        <button
          key={d.id}
          className="focus:outline-none text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          onClick={() => {handleDeleteClick(d.id)}}
          // onClick={() => {
          //   navigate(`/edit-buku/${d.id}`)
          // }}
        >
          Hapus
        </button>
      ]
    }
  ];
  const data = [
    {
      id: 1,
      namaPengguna: 'Pengguna 1',
      email: 'emailpengguna1@gmail.com',
    },
    {
      id: 2,
      namaPengguna: 'Pengguna 2',
      email: 'emailpengguna2@gmail.com',
    },
    {
      id: 3,
      namaPengguna: 'Pengguna 3',
      email: 'emailpengguna3@gmail.com',
    }
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(e) {
    const newData = data.filter(row => {
      return row.namaPengguna.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(newData)
  }

    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  
        {/* <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl">
          <div className="mb-4">
            <h1>Manajemen Pengguna</h1>
          </div>
        </div> */}

        <div className="grid grid-rows-1 mb-2">
          <input className="col-start-1 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-indigo-400 sm:text-sm sm:leading-6 mr-2" type="text" placeholder="Cari Nama Pengguna" onChange={handleFilter}/>
          <button type="button" className="btn btn-input col-end-10 focus:outline-none text-white bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 mr-2" onClick={() => {handleAddClick()}}>
            <i className="bi bi-plus"></i> + Tambah Pengguna
          </button>
        </div>
        <DataTable
          columns={columns}
          data={records}
          fixedHeader
          pagination
          highlightOnHover
          customStyles={customStyles}>
        </DataTable>
  
      </div>
    )
  
  }
  
  export default ManajemenPengguna;