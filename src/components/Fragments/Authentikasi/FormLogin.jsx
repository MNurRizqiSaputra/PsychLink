import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import InputForm from "../../Elements/Input";
import Button from "../../Elements/Button";

function FormLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if email and password are not empty
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
      const user = response.data[0];

      if (user) {
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on user role
        switch (user.role) {
          case "pasien":
            navigate("/homepasien");
            break;
          case "psikolog":
            navigate("/homepsikolog");
            break;
          case "admin":
            navigate("/homeadmin");
            break;
          default:
            setError("Invalid user role");
            break;
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm label="Email" name="email" type="email" placeholder="email" />
      <InputForm label="Password" name="password" type="password" placeholder="password" />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        className={`w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        type="submit"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}

export default FormLogin;