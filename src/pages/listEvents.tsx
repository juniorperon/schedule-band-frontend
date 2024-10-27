import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Erro ao carregar eventos:", error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      alert("Erro ao deletar evento");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/registerEvent?id=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Listagem de Eventos</h1>
      {events.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Músico</th>
              <th className="border border-gray-300 px-4 py-2">Instrumento</th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {event.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {event.musician.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {event.instrument.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="text-blue-600 hover:text-blue-800 mx-2"
                  >
                    <FaEdit className="mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-800 mx-2"
                  >
                    <FaTrash className="mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Sem eventos cadastrados</h1>
      )}
      <button
        onClick={() => router.push("home")}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
      >
        Voltar
      </button>
      <button
        onClick={() => router.push("/registerEvent")}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Adicionar Evento
      </button>
    </div>
  );
};

export default ListEvents;
