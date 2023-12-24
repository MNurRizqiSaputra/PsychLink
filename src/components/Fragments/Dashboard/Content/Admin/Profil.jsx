import { useEffect, useState } from "react";
import { BiEdit, BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

function ProfilAdmin() {
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
        user.role === "admin" && user.username === loggedInUser.username
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
    image: `https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${
      dataUser.username || ""
    }`,
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = async () => {
    try {
      // Show Swal modal for editing profile
      const { value: formValues, dismiss } = await Swal.fire({
        title: "Edit Profil",
        html: `<input id="swal-input1" class="swal2-input" placeholder="Nama" value="${dataUser.username || ""}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${dataUser.email || ""}">
        <input id="swal-input3" class="swal2-input" placeholder="Password" type="text" value="${dataUser.password || ""}">`,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const name = document.getElementById("swal-input1").value;
          const email = document.getElementById("swal-input2").value;
          const password = document.getElementById("swal-input3").value;
  
          if (!name || !email || !password) {
            Swal.showValidationMessage("Pastikan semua data terisi");
            return false;
          }
  
          if (!isValidEmail(email)) {
            Swal.showValidationMessage("Masukkan email yang valid");
            return false;
          }
  
          return [name, email, password];
        },
      });
  
      // Process formValues if not canceled
      if (formValues) {
        const [name, email, password] = formValues;
        const data = {
          username: name,
          email: email,
          password: password,
        };
  
        // Make PATCH request to update user data
        const res = await axios.patch(`http://localhost:3000/users/${dataUser.id}`, data);
        console.log("API Response:", res.data);
  
        // Update local storage and log out by setting userLoggedIn to false
        localStorage.setItem("user", JSON.stringify(res.data));
        setUserLoggedIn(false);
  
        // Redirect to "/login" after a delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 100); // 0.5-second delay
      } else if (dismiss === Swal.DismissReason.cancel) {
        // Handle cancel action here
        console.log("Editing canceled");
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex items-center px-6 py-3 bg-gray-900 justify-center">
          <BiUser size={20} className="text-white mr-2" />
          <h1 className="text-lg font-semibold text-white">
            {dataUser.role || ""}
          </h1>
        </div>

        <img
          className="object-cover object-center w-full h-56"
          src={data.image}
          alt={`Foto profil ${dataUser.username || ""}`}
        />

        <div className="px-6 py-4 text-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white bg-slate-200">
            {dataUser.username || ""}
          </h1>

          <div className="flex items-center mt-2 justify-center">
            <BiEnvelope size={20} className="text-gray-500 mr-2" />
            <p className="text-gray-700 dark:text-gray-400">
              {dataUser.email || ""}
            </p>
          </div>

          <div className="flex items-center mt-2 justify-center">
            <BiLock size={20} className="text-gray-500 mr-2" />
            <p className="text-gray-700 dark:text-gray-400">
              Password: {dataUser.password || ""}
            </p>
          </div>

          <button
            onClick={handleEdit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 h-full w-full flex items-center justify-center"
          >
            <BiEdit size={20} className="mr-2" />
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilAdmin;
