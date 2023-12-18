// FormRegister.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "../../Elements/Input";
import Button from "../../Elements/Button";

function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        // Tentukan id berikutnya berdasarkan data pengguna saat ini
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        setNextId(newId);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set data pengguna baru termasuk id
      const newUserData = { ...formData, role: "pasien", id: nextId };

      // Simpan data ke localStorage
      const usersFromLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...usersFromLocalStorage, newUserData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Kirim data ke db.json
      await axios.post("http://localhost:3000/users", newUserData);

      // Redirect atau tampilkan pesan sukses
      window.location.href = "/login"; // Ganti dengan halaman yang sesuai
    } catch (error) {
      console.error("Error:", error);
      // Handle error, misalnya tampilkan pesan kesalahan
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />

      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Register
      </Button>
    </form>
  );
}

export default FormRegister;
