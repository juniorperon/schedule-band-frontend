import { useRouter } from "next/router";
import {
  FaUser,
  FaPlus,
  FaCalendarPlus,
  FaCalendar,
  FaSignOutAlt,
  FaGuitar,
  FaUserPlus,
} from "react-icons/fa";

const Home = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleListMusicians = () => {
    router.push("/listMusicians");
  };

  const handleListEvents = () => {
    router.push("/listEvents");
  };

  const handleListInstruments = () => {
    router.push("/listInstruments");
  };

  const handleAddMusician = () => {
    router.push("/registerMusician");
  };

  const handleAddEvent = () => {
    router.push("/registerEvent");
  };

  const handleAddInstrument = () => {
    router.push("/registerInstrument");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <FaSignOutAlt className="mr-1" />
          Sair
        </button>
      </div>
      <h1 className="text-4xl mb-6">Gerenciador de Músicos e Eventos</h1>
      <div className="flex space-x-4">
        <div className="space-y-4 justify-items-center">
          <button
            onClick={handleListMusicians}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaUser className="mr-1" />
            Listar Músicos
          </button>
          <button
            onClick={handleListEvents}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaCalendar className="mr-1" />
            Listar Eventos
          </button>
          <button
            onClick={handleListInstruments}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaGuitar className="mr-1" />
            Listar Instrumentos
          </button>
        </div>
        <div className="space-y-4 justify-items-center">
          <button
            onClick={handleAddMusician}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaUserPlus className="mr-1" />
            Adicionar Músico
          </button>
          <button
            onClick={handleAddEvent}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaCalendarPlus className="mr-1" />
            Adicionar Evento
          </button>
          <button
            onClick={handleAddInstrument}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaPlus className="mr-1" />
            Adicionar Instrumento
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
