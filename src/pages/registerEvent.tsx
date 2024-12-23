import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/shared/services/api";
import PrivateRoute from "@/components/PrivateRoute";

type Musician = {
  id: number;
  fullName: string;
  instruments: Instrument[];
};

type Instrument = {
  id: number;
  name: string;
};

const RegisterEvent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedMusician, setSelectedMusician] = useState<Musician | null>(null);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await api.get("/musician");
        setMusicians(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicos:", error);
        alert("Erro ao carregar músicos");
      }
    };

    fetchMusicians();

    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await api.get(`/events/${id}`);
          const event = response.data;

          setTitle(event.title);
          setLocal(event.local);
          setDate(event.date);
          setSelectedMusician(event.musician);
          setSelectedInstrument(event.instrument);
        } catch (error) {
          console.error("Erro ao buscar evento:", error);
          alert("Erro ao carregar evento");
        }
      };

      fetchEvent();
    }
  }, [id]);

  useEffect(() => {
    if (selectedMusician) {
      setInstruments(selectedMusician.instruments);
    }
  }, [selectedMusician]);

  const handleMusicianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const musicianId = Number(e.target.value);
    const musician = musicians.find((m) => m.id === musicianId) || null;
    setSelectedMusician(musician);
    setInstruments(musician ? musician.instruments : []);
    setSelectedInstrument(null);
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instrumentId = Number(e.target.value);
    const instrument = instruments.find((i) => i.id === instrumentId) || null;
    setSelectedInstrument(instrument);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedMusician && selectedInstrument) {
      const eventData = {
        title,
        local,
        date,
        musicianId: selectedMusician.id,
        instrumentId: selectedInstrument.id,
      };

      try {
        if (id) {
          await api.put(`/events/${id}`, eventData);
          alert(`Evento atualizado com sucesso! Data: ${date}`);
        } else {
          await api.post("/events", eventData);
          alert(`Evento adicionado com sucesso! Data: ${date}`);
        }
        router.push("/listEvents");
      } catch (error) {
        console.error("Erro ao salvar evento:", error);
        alert("Ocorreu um erro ao salvar o evento. Tente novamente.");
      }
    } else {
      alert("Por favor, selecione um músico e um instrumento.");
    }
  };

  return (
    <PrivateRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl mb-4">{id ? "Editar Evento" : "Adicionar Evento"}</h1>
          <div className="mb-4">
            <label className="block mb-2">Nome do Evento:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Local do Evento:</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
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
              value={selectedMusician?.id || ""}
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
                value={selectedInstrument?.id || ""}
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
              onClick={() => router.push("home")}
              className="mr-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {id ? "Atualizar Evento" : "Adicionar Evento"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default RegisterEvent;
