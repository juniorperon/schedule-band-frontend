import { useState } from "react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";

// Simulação de dados
const mockEvents = [
  {
    id: 1,
    date: "2024-10-25",
    musicians: [
      { fullName: "João Silva", instrument: "Guitar" },
      { fullName: "Maria Oliveira", instrument: "Bass" },
    ],
  },
  {
    id: 2,
    date: "2024-11-01",
    musicians: [{ fullName: "Carlos Santos", instrument: "Piano" }],
  },
];

const ListEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState(mockEvents);

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEdit = (id: number) => {
    // abrir formulario
    // editar
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Listagem de Eventos</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Data</th>
            <th className="border border-gray-300 px-4 py-2">Músicos</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="border border-gray-300 px-4 py-2">{event.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {event.musicians.map((musician) => (
                  <div key={musician.fullName}>
                    {musician.fullName} ({musician.instrument})
                  </div>
                ))}
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
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
      >
        Voltar
      </button>
    </div>
  );
};

export default ListEvents;
