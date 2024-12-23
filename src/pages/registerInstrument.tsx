import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/shared/services/api";
import PrivateRoute from "@/components/PrivateRoute";

const RegisterInstrument = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchInstrument = async () => {
      if (id) {
        try {
          const response = await api.get(`/instruments/${id}`);
          setName(response.data.name);
        } catch (error) {
          console.error("Erro ao buscar instrumento:", error);
          alert("Erro ao carregar instrumento");
        }
      }
    };

    fetchInstrument();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const instrumentData = { name };
      if (id) {
        await api.put(`/instruments/${id}`, instrumentData);
        alert("Instrumento atualizado com sucesso");
      } else {
        await api.post("/instruments", instrumentData);
        alert("Instrumento criado com sucesso");
      }
      router.push("/listInstruments");
    } catch (error) {
      console.error("Erro ao salvar instrumento:", error);
      alert("Erro ao salvar instrumento");
    }
  };

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl mb-4">
          {id ? "Editar Instrumento" : "Criar Instrumento"}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Nome do Instrumento:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {id ? "Atualizar Instrumento" : "Criar Instrumento"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default RegisterInstrument;
