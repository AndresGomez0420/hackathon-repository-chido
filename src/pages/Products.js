import { useForm } from "react-hook-form";

export default function Products(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            id: "",
            productId: "",
            storeId: "",
            amount: "",
            stock: "",
            date: ""
        }
    });

    const onSubmit = (data) => {
    console.log("Datos de los productos", data);
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de los productos</h2>
        <div className="mb-4">
          <input
            {...register("id")}
            placeholder="Id"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("productId", { required: "El ID del producto es obligatorio" })}
            placeholder="Id del producto"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          {errors.productId && <p className="text-red-500 text-sm">{errors.productId.message}</p>}
          <input
            {...register("storeId")}
            placeholder="Id del negocio"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <input
            {...register("amount", { required: "El monto es obligatorio", lueAsNumber: true, 
                min: { value: 0, message: "El monto no puede ser negativo" }
            })}
            placeholder="Monto"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          <input
            {...register("stock")}
            placeholder="Existencias"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <label htmlFor="openingTime">Fecha</label>
          <input 
          type="date"
          id="date"
          {...register("date")}
          placeholder="Fecha"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Registrar Producto
          </button>
        </div>
      </form>
    </div>
    )
}