import { useNavigate } from "react-router-dom";
import InputForm from "../../Elements/Input";
import Button from "../../Elements/Button";

function FormLogin() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        // Save email and password to local storage
        localStorage.setItem("email", event.target.email.value);
        localStorage.setItem("password", event.target.password.value);

        // Print email and password to console
        console.log("Email:", event.target.email.value);
        console.log("Password:", event.target.password.value);
        console.log("Form submitted");

        // Redirect to homepasien page using React Router
        navigate("/homepasien");
    };

    return (
        <form onSubmit={handleLogin}>
            <InputForm 
                label="Email" 
                name="email" 
                type="email" 
                placeholder="email" 
            />

            <InputForm 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="password" 
            />

            <Button className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
                Login
            </Button>
        </form>
    );
}

export default FormLogin;
