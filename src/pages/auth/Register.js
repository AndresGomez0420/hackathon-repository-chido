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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <div className="mb-4">
          <input
            {...register("firstName")}
            placeholder="Nombre"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("lastName")}
            placeholder="Apellido"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("curp")}
            placeholder="CURP"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("rfc")}
            placeholder="RFC"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("email")}
            placeholder="Correo Electrónico"
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("numberPhone")}
            placeholder="Teléfono"
            type="tel"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("birthDate")}
            placeholder="Fecha de nacimiento"
            type="date"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
);
}