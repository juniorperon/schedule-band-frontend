import { useState } from "react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";

// Simulação de dados
const mockMusicians = [
  {
    id: 1,
    fullName: "João Silva",
    email: "joao@example.com",
    instruments: ["Guitar", "Drums"],
  },
  {
    id: 2,
    fullName: "Maria Oliveira",
    email: "maria@example.com",
    instruments: ["Bass"],
  },
  {
    id: 3,
    fullName: "Carlos Santos",
    email: "carlos@example.com",
    instruments: ["Guitar", "Piano"],
  },
];

const ListMusicians = () => {
  const router = useRouter();
  const [musicians, setMusicians] = useState(mockMusicians);

  const handleDelete = (id: number) => {
    setMusicians(musicians.filter((musician) => musician.id !== id));
  };

  const handleEdit = (id: number) => {
    // abrir formulario
    // editar
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Listagem de Músicos</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Instrumentos</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {musicians.map((musician) => (
            <tr key={musician.id}>
              <td className="border border-gray-300 px-4 py-2">
                {musician.fullName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {musician.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {musician.instruments.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(musician.id)}
                  className="text-blue-600 hover:text-blue-800 mx-2"
                >
                  <FaEdit className="mr-1" />
                </button>
                <button
                  onClick={() => handleDelete(musician.id)}
                  className="text-red-600 hover:text-red-800 mx-2"
                >
                  <FaTrash className="mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ListMusicians;
