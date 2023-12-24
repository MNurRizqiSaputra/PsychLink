import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const ProfilPsikolog = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dataUser, setDataUser] = useState({});

  const getUserLoggedIn = async () => {
    const res = localStorage.getItem("user");
    const user = JSON.parse(res);
    setLoggedInUser(user);
    setUserLoggedIn(true);
  };

  const getUserData = async () => {
    const res = await axios.get("http://localhost:3000/users");
    const filter = res.data.filter(
      (user) =>
        user.role === "psikolog" && user.username === loggedInUser.username
    );

    const data = filter.map((user) => ({
      ...user,
    }));

    setDataUser(data[0]);
  };

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      getUserData();
    }
  }, [userLoggedIn]);

  const data = {
    image: `https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${dataUser.username}`,
  };

  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Profil",
      html: `<input id="swal-input1" class="swal2-input" placeholder="Nama" value="${
        dataUser.username || ""
      }">
      <input id="swal-input2" class="swal2-input" placeholder="Email" value="${
        dataUser.email || ""
      }">
      ${
        dataUser.spesialisasi
          ? `<input id="swal-input3" class="swal2-input" placeholder="Spesialisasi" value="${
              dataUser.spesialisasi || ""
            }">`
          : ""
      }
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3")?.value,
        ];
      },
    });

    if (formValues) {
      const data = {
        username: formValues[0],
        email: formValues[1],
        spesialisasi: formValues[2],
      };

      const res = await axios.patch(
        `http://localhost:3000/users/${dataUser.id}`,
        data
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    }
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
      <div className="flex items-center gap-4 border border-blue-950 w-md p-5 rounded-lg relative">
        <div className="w-32 h-32 border-4 border-blue-800 rounded-full">
          <img
            src={data.image}
            alt={`Foto profil ${dataUser.username || ""}`}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h2 className="text-4xl font-bold">
            Hello {dataUser.username || ""}
          </h2>
          <div className="flex gap-3">
            <p className="text-lg font-semibold">{dataUser.email || ""}</p>
            <p className="text-lg font-semibold">
              {dataUser?.spesialisasi || ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="absolute top-0 right-0 p-2 text-blue-950 hover:text-blue-800"
        >
          <BiEdit size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProfilPsikolog;
