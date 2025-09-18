import {useForm} from "react-hook-form"
import { Link } from "react-router-dom";

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

return (<>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-96 bg-white rounded shadow-md">
    {/* Pestañas */}
    <div className="flex">
      {/* Pestaña activa */}
      <Link
        className="flex-1 relative px-4 py-2 text-center  text-gray-700 font-medium bg-gray-200
                   rounded-l-lg
                   [clip-path:polygon(0%_0,90%_0,100%_100%,0%_100%)]" to='/login'
      >
        Iniciar sesión
      </Link>

      {/* Pestaña inactiva */}
      <div
        className="flex-1 relative px-4 py-2 text-center text-white font-medium bg-blue-600  hover:bg-gray-300 
                   rounded-r-lg
                   [clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]" 
      >
        Registrarse
      </div>
    </div>
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
          <select {...register("userType")} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2">
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
          </select>
          <input
            {...register("curp")}
            placeholder="CURP" maxLength={18}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("rfc")}
            placeholder="RFC" maxLength={13}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("email")}
            placeholder="Correo Electrónico"
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
    </div>
    </>
);
}