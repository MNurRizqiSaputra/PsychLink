// Input.jsx
function Input(props) {
    const { type, placeholder, name, value, onChange } = props;
  
    return (
      <input
        type={type}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    );
  }
  
  export default Input;
  