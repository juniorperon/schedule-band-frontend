import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

// Simulação de dados (substituir depois pela requisição API)
const mockInstruments = [
  { id: 1, name: "Guitarra" },
  { id: 2, name: "Baixo" },
  { id: 3, name: "Bateria" },
];

const ListInstruments = () => {
  const router = useRouter();
  const [instruments, setInstruments] = useState(mockInstruments);

  useEffect(() => {
    // Carregar instrumentos da API
    // axios.get('/api/instruments').then(response => setInstruments(response.data));
  }, []);

  const handleDelete = (id: number) => {
    setInstruments(instruments.filter((instrument) => instrument.id !== id));
    // axios.delete(`/api/instruments/${id}`);
  };

  const handleEdit = (id: number) => {
    // router.push(`/edit-instrument/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Listagem de Instrumentos</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-20 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {instruments.map((instrument) => (
            <tr key={instrument.id}>
              <td className="border border-gray-300 px-4 py-2">
                {instrument.name}
              </td>
              <td className="flex border border-gray-300 py-4 justify-center">
                <button
                  onClick={() => handleDelete(instrument.id)}
                  className="text-red-600 hover:text-red-800 mx-2"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEdit(instrument.id)}
                  className="text-blue-600 hover:text-blue-800 mx-2"
                >
                  <FaEdit />
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

export default ListInstruments;
