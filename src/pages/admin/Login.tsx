import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const onLogin = (e: any) => {
    e.preventDefault();

    if (user.username === "" || user.password === "") {
      return showErrorToast("Todos los campos son obligatorios");
    }

    if (user.username !== "admin" || user.password !== "admin") {
      return showErrorToast("Usuario o contraseña incorrectos");
    }

    router("/admin/dashboard/navfooter");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[28rem]">
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            src="/images/Logo_icon.webp"
            alt="Logo"
            className="w-16 h-16 mr-2"
          />
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>

        <form className="flex flex-col gap-4 mt-8" onSubmit={onLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-gray-300"
              placeholder="Ingresa tu nombre de usuario"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300"
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
