import { Fragment } from "react";

function BantuanPasien() {
  const artikelContent = [
    {
      title: "Bagaimana cara mendaftar akun?",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates, voluptatum, quibusdam, quos asperiores doloremque doloribus quia quae quod voluptatem officia? Quisquam, quidem voluptas. Quisquam, quidem voluptas. Quisquam, quidem voluptas.",
    },
    {
      title: "Bagaimana cara konsultasi?",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates, voluptatum, quibusdam, quos asperiores doloremque doloribus quia quae quod voluptatem officia? Quisquam, quidem voluptas. Quisquam, quidem voluptas. Quisquam, quidem voluptas.",
    },
    {
      title: "Bagaimana cara melihat riwayat konsultasi?",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates, voluptatum, quibusdam, quos asperiores doloremque doloribus quia quae quod voluptatem officia? Quisquam, quidem voluptas. Quisquam, quidem voluptas. Quisquam, quidem voluptas.",
    },
  ];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="text-4xl font-bold">Artikel Bantuan</h1>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {artikelContent.map((artikel) => (
          <Fragment key={artikel.title}>
            <div className="border rounded-xl px-5 py-4">
              <h2 className="text-lg font-semibold">{artikel.title}</h2>
              <p className="text-gray-600 line-clamp-3 mt-2">
                {artikel.content}
              </p>
              <button className="mt-2 text-blue-500 hover:underline">
                Baca selengkapnya
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default BantuanPasien;
