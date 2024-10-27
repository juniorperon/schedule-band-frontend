import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RegisterEvent = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [selectedMusician, setSelectedMusician] = useState<any>(null);
  const [musicians, setMusicians] = useState<
    {
      id: number;
      fullName: string;
      instruments: { id: number; name: string }[];
    }[]
  >([]);
  const [instruments, setInstruments] = useState<
    { id: number; name: string }[]
  >([]); // Lista de instrumentos dinâmica
  const [selectedInstrument, setSelectedInstrument] = useState<any>(null);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await axios.get("http://localhost:3333/musician");
        console.log(response.data);
        setMusicians(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicos:", error);
        alert("Erro ao carregar músicos");
      }
    };
    fetchMusicians();
  }, []);

  const handleMusicianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const musicianId = Number(e.target.value);
    const musician = musicians.find((m) => m.id === musicianId);
    setSelectedMusician(musician || null);
    if (musician) {
      setInstruments(musician.instruments);
    } else {
      setInstruments([]);
    }
    setSelectedInstrument("");
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instrumentId = Number(e.target.value);
    const instrument = instruments.find((i) => i.id === instrumentId);
    console.log("INSTRUMENT", instrument);
    setSelectedInstrument(instrument || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMusician && selectedInstrument) {
      const newEvent = {
        date,
        musicianId: selectedMusician.id,
        instrumentId: selectedInstrument.id,
      };

      console.log("EVENTO", newEvent);

      try {
        await axios.post("http://localhost:3333/events", newEvent).then(() => {
          alert(`Evento adicionado com sucesso! Data: ${date}`);
          router.push("/listEvents");
        });
      } catch (error) {
        console.error("Erro ao adicionar evento:", error);
        alert("Ocorreu um erro ao adicionar o evento. Tente novamente.");
      }
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
            {musicians.map((musician) => (
              <option key={musician.id} value={musician.id}>
                {musician.fullName}
              </option>
            ))}
          </select>
        </div>
        {instruments.length > 0 && (
          <div className="mb-4">
            <label className="block mb-2">Escolha um Instrumento:</label>
            <select
              onChange={handleInstrumentChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            >
              <option value="">Selecione um instrumento</option>
              {instruments.map((instrument) => (
                <option key={instrument.id} value={instrument.id}>
                  {instrument.name}
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
