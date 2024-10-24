import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegisterMusician() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [instruments, setInstruments] = useState<string[]>([]);
  const router = useRouter();

  // Lista mockada de instrumentos
  const availableInstruments = ["Guitar", "Bass", "Drums", "Piano", "Violin"];

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const instrument = e.target.value;
    setInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/musician", {
        fullName,
        email,
        instruments,
      });
      alert("Musician created successfully");
      router.push("/home"); // Redireciona para a página inicial após o sucesso
    } catch (error) {
      console.error(error);
      alert("Failed to create musician");
    }
  };

  const handleBack = () => {
    router.push("/home"); // Volta para a tela home
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-4">Registrar Músico</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium">Nome Completo:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Instrumentos:</label>
          <div>
            {availableInstruments.map((instrument) => (
              <div key={instrument}>
                <input
                  type="checkbox"
                  value={instrument}
                  onChange={handleInstrumentChange}
                  className="mr-2"
                />{" "}
                {instrument}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="mr-5 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Criar Músico
          </button>
        </div>
      </form>
    </div>
  );
}
