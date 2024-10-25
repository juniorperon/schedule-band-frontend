import { useState } from "react";
import { useRouter } from "next/router";

// Simulação de dados
const mockMusicians = [
  { id: 1, fullName: "João Silva", instruments: ["Guitar", "Drums"] },
  { id: 2, fullName: "Maria Oliveira", instruments: ["Bass"] },
  { id: 3, fullName: "Carlos Santos", instruments: ["Guitar", "Piano"] },
];

const RegisterEvent = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [selectedMusicians, setSelectedMusicians] = useState<
    { id: number; instrument: string }[]
  >([]);
  const [selectedMusician, setSelectedMusician] = useState<number | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string>("");

  const handleMusicianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const musicianId = Number(e.target.value);
    setSelectedMusician(musicianId);
    setSelectedInstrument(""); // Resetar o instrumento selecionado
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instrument = e.target.value;
    setSelectedInstrument(instrument);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMusician !== null && selectedInstrument) {
      setSelectedMusicians((prev) => [
        ...prev,
        { id: selectedMusician, instrument: selectedInstrument },
      ]);
      alert(
        `Evento adicionado com sucesso! Data: ${date}, Músicos: ${JSON.stringify(
          selectedMusicians.concat({
            id: selectedMusician,
            instrument: selectedInstrument,
          })
        )}`
      );
      router.push("/list-events"); // Redirecionar para a listagem de eventos após adicionar
    } else {
      alert("Por favor, selecione um músico e um instrumento.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4">Adicionar Evento</h1>
        <div className="mb-4">
          <label className="block mb-2">Data do Evento:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Músicos:</label>
          <select
            onChange={handleMusicianChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Selecione um músico</option>
            {mockMusicians.map((musician) => (
              <option key={musician.id} value={musician.id}>
                {musician.fullName}
              </option>
            ))}
          </select>
        </div>
        {selectedMusician !== null && (
          <div className="mb-4">
            <label className="block mb-2">Escolha um Instrumento:</label>
            <select
              onChange={handleInstrumentChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            >
              <option value="">Selecione um instrumento</option>
              {mockMusicians
                .find((musician) => musician.id === selectedMusician)
                ?.instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Adicionar Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterEvent;
