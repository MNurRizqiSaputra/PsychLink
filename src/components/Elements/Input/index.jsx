import Input from "./Input";
import Label from "./label";

function InputForm (props) {

    const {label, name, type, placeholder} = props

    return (
        <div className="mb-4">

        <Label htmlFor={name}>{label}</Label>
        <Input name={name} type={type} placeholder={placeholder}/>
        </div>
    )
}

export default InputForm;