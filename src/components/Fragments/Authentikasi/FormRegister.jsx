import InputForm from "../../Elements/Input";
import Button from "../../Elements/Button";
import { Link } from "react-router-dom";

function FormRegister() {
    
    return (
        <form action="">

            <InputForm 
                label="Username" name="username" type="text" placeholder="username" 
            />

            <InputForm 
                label="Email" name="email" type="email" placeholder="email" 
            />

            <InputForm 
                label="Password" name="password" type="password" placeholder="password" 
            />

            <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                Register
            </Button>
            </Link>

        </form>
    )
}

export default FormRegister;