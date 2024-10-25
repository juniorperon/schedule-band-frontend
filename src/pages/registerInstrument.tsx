import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterInstrument() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aqui você faria uma requisição POST para salvar o instrumento
      // await axios.post('/api/instruments', { name });
      alert("Instrumento criado com sucesso");
      router.push("/list-instruments");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar instrumento");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-4">Criar Instrumento</h1>
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
            onClick={() => router.push("/home")}
            className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Criar Instrumento
          </button>
        </div>
      </form>
    </div>
  );
}
