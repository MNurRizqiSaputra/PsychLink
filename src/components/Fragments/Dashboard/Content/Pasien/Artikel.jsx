import { Fragment } from "react";
import Swal from "sweetalert2";

function ArtikelPasien() {
  const artikelContent = [
    {
      title: "Cara Mengelola Stres Sehari-hari",
      content:
        "Mengelola stres adalah kunci untuk menjaga kesehatan mental. Luangkan waktu untuk melakukan aktivitas yang Anda nikmati, seperti berjalan-jalan, meditasi, atau mendengarkan musik yang menenangkan.",
    },
    {
      title: "Tips Menjaga Kesehatan Mental di Era Digital",
      content:
        "Di era digital ini, menjaga kesehatan mental menjadi lebih penting. Batasi waktu screen time, tetap terhubung dengan orang-orang terdekat, dan sesekali beri diri Anda waktu untuk beristirahat tanpa gadget.",
    },
    {
      title: "Cara Meningkatkan Mood Setiap Hari",
      content:
        "Ada beberapa kebiasaan kecil yang dapat membantu meningkatkan mood sehari-hari. Misalnya, olahraga rutin, makan makanan bergizi, dan berbagi cerita positif dengan orang-orang di sekitar Anda.",
    },
  ];

  const showSweetAlert = (title, content) => {
    Swal.fire({
      title: title,
      html: content,
      icon: "info",
    });
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="text-4xl font-bold">Artikel Bantuan</h1>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {artikelContent.map((artikel) => (
          <Fragment key={artikel.title}>
            <div className="px-5 py-4 border rounded-xl">
              <h2 className="text-lg font-semibold">{artikel.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">
                {artikel.content}
              </p>
              <button
                className="mt-2 text-blue-500 hover:underline"
                onClick={() => showSweetAlert(artikel.title, artikel.content)}
              >
                Baca selengkapnya
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ArtikelPasien;