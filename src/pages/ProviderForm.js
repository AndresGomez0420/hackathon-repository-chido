import {useForm} from "react-hook-form"

export default function ProviderForm(){
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            storeName: "",
            taxId: "", // rfc
            address: "",
            email: "",
            password: "",
            primaryPhone: "",
            secondaryPhone: "",
            storeType: "",
            openingTime: "",
            closingTime: "",
            accountNumber: "" // Numero de cuenta 
        },
    });

    const onSubmit = (data) => {
    console.log("Datos del proveedor", data);
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro del Proveedor</h2>
        <div className="mb-4">
          <input
            {...register("firstName")}
            placeholder="Nombre"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("lastName")}
            placeholder="Apellidos"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("storeName")}
            placeholder="Nombre del negocio"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("taxId")}
            placeholder="RFC"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("firstName")}
            placeholder="Nombre"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("address")}
            placeholder="Direccion del negocio"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("email")}
            placeholder="Direccion de correo"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("password")}
            placeholder="Contrasena"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("primaryPhone")}
            placeholder="Contacto 1"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("secondaryPhone")}
            placeholder="Contacto 2"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("storeType")}
            placeholder="Tipo de negocio"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <label htmlFor="openingTime">Hora de apertura</label>
          <input type="time" id="openingTime"
            {...register("openingTime")}
            placeholder="Hora de apertura"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
            />
          <label htmlFor="openingTime">Hora de clausura</label>
          <input type="time" id="openingTime"
            {...register("openingTime")}
            placeholder="Hora de apertura"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
            />
          <input
            {...register("accountNumber")}
            placeholder="Numero de cuenta"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Registrar Negocio
          </button>
        </div>
      </form>
    </div>
    );
}

