import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListInstruments = () => {
  const router = useRouter();
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/instruments")
      .then((response) => setInstruments(response.data));
  }, []);

  const handleDelete = (id: number) => {
    setInstruments(instruments.filter((instrument) => instrument.id !== id));
    try {
      axios.delete(`http://localhost:3333/instruments/${id}`);
      alert("Instrumento deletado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar instrumento");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/registerInstrument?id=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Listagem de Instrumentos</h1>
      {instruments.length > 0 ? (
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
                    onClick={() => handleEdit(instrument.id)}
                    className="text-blue-600 hover:text-blue-800 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(instrument.id)}
                    className="text-red-600 hover:text-red-800 mx-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Sem instrumentos cadastrados</h1>
      )}
      <button
        onClick={() => router.push("/home")}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
      >
        Voltar
      </button>
      <button
        onClick={() => router.push("/registerInstrument")}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Adicionar Instrumento
      </button>
    </div>
  );
};

export default ListInstruments;
