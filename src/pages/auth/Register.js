import {useForm} from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            walletAddress: "",
            developerKeys: "",
            email: "",
            numberPhone: "",
            password: "",
            userType: "",
        },
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Función para enviar datos al backend
    const registerService = async (userData) => {
        const response = await fetch("http://localhost:5000/u/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en el registro');
        }

        return data;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage('');

        try {
            console.log("Datos del formulario:", data);

            // Mapear los datos del formulario al formato esperado por el backend
            const userData = {
                name: data.firstName,
                last_name: data.lastName,
                email_address: data.email,
                password_account: data.password,
                num_tel: data.numberPhone,
                num_tel_2: null,
                person_type: data.userType === 'cliente' ? true : false,
                wallet_address: data.walletAddress || null,
                developer_keys: data.developerKeys || null,
                num_tarjet: null
            };

            const result = await registerService(userData);
            
            setMessage("✅ Registro exitoso: " + result.message);
            
            // Guardar token y datos del usuario
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            // Redirigir después de un breve delay
            setTimeout(() => {
                navigate("/clientes");
            }, 1500);

        } catch (err) {
            setMessage("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-96 bg-white rounded shadow-md">
                {/* Pestañas */}
                <div className="flex">
                    <Link
                        className="flex-1 relative px-4 py-2 text-center text-gray-700 font-medium bg-gray-200 rounded-l-lg [clip-path:polygon(0%_0,90%_0,100%_100%,0%_100%)]"
                        to='/login'
                    >
                        Iniciar sesión
                    </Link>
                    <div
                        className="flex-1 relative px-4 py-2 text-center text-white font-medium bg-blue-600 hover:bg-gray-300 rounded-r-lg [clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]"
                    >
                        Registrarse
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
                    
                    {/* Mensaje de estado */}
                    {message && (
                        <div className={`mb-4 p-3 rounded text-sm ${
                            message.includes('✅') 
                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="mb-4">
                         <input
                            {...register("firstName", { 
                                required: "El nombre es requerido",
                                maxLength: {
                                    value: 20,
                                    message: "El nombre no puede tener más de 50 caracteres"
                                }
                            })}
                            placeholder="Nombre"
                            maxLength={20}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mb-2">{errors.firstName.message}</p>}

                        <input
                            {...register("lastName", { required: "El apellido es requerido" })}
                            placeholder="Apellido"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mb-2">{errors.lastName.message}</p>}

                        <select 
                            {...register("userType", { required: "Selecciona un tipo de usuario" })} 
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                            defaultValue=""
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="cliente">Cliente</option>
                            <option value="proveedor">Proveedor</option>
                        </select>
                        {errors.userType && <p className="text-red-500 text-xs mb-2">{errors.userType.message}</p>}

                        <input
                            {...register("email", { 
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                            placeholder="Correo Electrónico"
                            type="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

                        <input
                            {...register("password", { 
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })}
                            placeholder="Contraseña"
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

                        <input
                            {...register("numberPhone", {
                                pattern: {
                                    value: /^[0-9]{7,15}$/,
                                    message: "El teléfono debe contener solo números y tener entre 7 y 15 dígitos"
                                }
                            })}
                            placeholder="Teléfono"
                            type="tel"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.numberPhone && <p className="text-red-500 text-xs mb-2">{errors.numberPhone.message}</p>}

                        <input
                            {...register("walletAddress", {
                                maxLength: {
                                    value: 40,
                                    message: "La dirección de wallet no puede tener más de 40 caracteres"
                                }
                            })}
                            placeholder="Wallet Address (opcional)"
                            maxLength={40}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.walletAddress && <p className="text-red-500 text-xs mb-2">{errors.walletAddress.message}</p>}

                        <input
                            {...register("developerKeys", {
                                maxLength: {
                                    value: 25,
                                    message: "Las developer keys no pueden tener más de 25 caracteres"
                                }
                            })}
                            placeholder="Developer Keys (opcional)"
                            maxLength={25}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                        />
                        {errors.developerKeys && <p className="text-red-500 text-xs mb-2">{errors.developerKeys.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded transition ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                    >
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}