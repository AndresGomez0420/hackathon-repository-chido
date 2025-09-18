function Contact() {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Video de YouTube como fondo */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
  <iframe
    className="w-full h-full scale-125 brightness-150"
    src="https://www.youtube.com/embed/KxXgJDqaPm0?autoplay=1&mute=1&controls=0&loop=1&playlist=KxXgJDqaPm0"
    title="Loop Empresarial Video"
    frameBorder="0"
    allow="autoplay; fullscreen"
  ></iframe>
</div>

        {/* Capa oscura para mejorar contraste */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

        {/* Contenido */}
        <div className="bg-none text-white rounded-lg shadow-lg p-6 w-full max-w-md text-center relative z-10">
          <img
            src="https://loopempresarial.com.mx/wp-content/uploads/2022/02/Logo-loop-sin-fondo-768x288.png"
            alt="Logo Loop Empresarial"
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-4">Loop Conexión Empresarial</h2>

          <div className="space-y-2 ">
            <p>
              <span className="font-semibold">Tel:</span> 55-55-55-55-55
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              Loop.conexion.Empresarial@loopEmpresarial.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
