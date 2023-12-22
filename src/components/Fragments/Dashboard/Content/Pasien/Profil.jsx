function ProfilPasien() {
  const data = {
    nama: "Rizky",
    image: "https://i.pravatar.cc/300",
    email: "rizkt@gmail.com",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "12/12/2001",
    noTelp: "081234567890",
    alamat: "Jl. Raya No. 12",
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 border-4 border-blue-800 rounded-full">
          <img
            src={data.image}
            alt="profil"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold">{data.nama}</h2>
          <p className="text-lg font-semibold">{data.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Detail data diri</h2>
        <table className="w-full text-sm text-left text-gray-500 border rtl:text-right">
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Jenis Kelamin</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.jenisKelamin}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Tanggal Lahir</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.tanggalLahir}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">No. Telepon</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.noTelp}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Alamat</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.alamat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfilPasien;
