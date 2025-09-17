import {useForm} from "react-hook-form"

export default function Register(){
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            curp: "",
            rfc: "",
            email: "",
            numberPhone: "",
            birthDate: "",

        },
    });

const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
};

return (
    <form onSubmit = {handleSubmit(onSubmit)}>
        <input{... register("firstName")}placeholder="Nombre" />
        <input{... register("lastName")}placeholder="Apellido" />
        <input{... register("curp")}placeholder="CURP" />
        <input{... register("rfc")}placeholder="RFC" />
        <input{... register("email")}placeholder="Correo Electronico" />
        <input{... register("numberPhone")}placeholder="Telefono" />
        <input{... register("birthDate")}placeholder="date" />

        <button type="submit">Registrar</button>
    </form>
);
}