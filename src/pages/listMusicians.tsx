import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import api from "@/shared/services/api";

interface Instrument {
  name: string;
}

interface Musician {
  id: number;
  fullName: string;
  email: string;
  instruments: Instrument[];
}

const ListMusicians: React.FC = () => {
  const router = useRouter();
  const [musicians, setMusicians] = useState<Musician[]>([]);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await api.get<Musician[]>("/musician"); 
        setMusicians(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicos:", error);
        alert("Erro ao carregar músicos");
      }
    };
    fetchMusicians();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/musician/${id}`);
      setMusicians((prevMusicians) => prevMusicians.filter((musician) => musician.id !== id));
      alert("Músico deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar músico:", error);
      alert("Erro ao deletar músico");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/registerMusician?id=${id}`);
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Listagem de Músicos</h1>
        {musicians.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Instrumentos</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {musicians.map((musician) => (
                <tr key={musician.id}>
                  <td className="border border-gray-300 px-4 py-2">{musician.fullName}</td>
                  <td className="border border-gray-300 px-4 py-2">{musician.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {musician.instruments.map((instrument) => instrument.name).join(", ")}
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
        ) : (
          <h1>Sem músicos encontrados</h1>
        )}
        <div className="mt-4">
          <button
            onClick={() => router.push("/home")}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Voltar
          </button>
          <button
            onClick={() => router.push("/registerMusician")}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Adicionar Músico
          </button>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ListMusicians;
