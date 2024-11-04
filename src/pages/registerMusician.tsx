import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/shared/services/api";
import PrivateRoute from "@/components/PrivateRoute";

interface Musician {
  id: number;
  fullName: string;
  email: string;
  instruments: Instrument[];
}

interface Instrument {
  id: number;
  name: string;
}

const RegisterMusician = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedInstruments, setSelectedInstruments] = useState<Instrument[]>([]);
  const [availableInstruments, setAvailableInstruments] = useState<Instrument[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await api.get("/instruments");
        setAvailableInstruments(response.data);
      } catch (error) {
        console.error("Erro ao carregar instrumentos:", error);
        alert("Erro ao carregar instrumentos");
      }
    };

    const fetchMusician = async () => {
      if (id) {
        try {
          const response = await api.get(`/musician/${id}`);
          const musician: Musician = response.data;
          setFullName(musician.fullName);
          setEmail(musician.email);
          setSelectedInstruments(musician.instruments);
        } catch (error) {
          console.error("Erro ao buscar músico:", error);
          alert("Erro ao carregar músico");
        }
      }
    };

    fetchInstruments();
    fetchMusician();
  }, [id]);

  const handleInstrumentChange = (instrument: Instrument) => {
    setSelectedInstruments((prevSelected) =>
      prevSelected.some((selected) => selected.id === instrument.id)
        ? prevSelected.filter((selected) => selected.id !== instrument.id)
        : [...prevSelected, instrument]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const instrumentIds = selectedInstruments.map(
      (instrument) => instrument.id
    );

    try {
      const musicianData = { fullName, email, instruments: instrumentIds };
      if (id) {
        await api.put(`/musician/${id}`, musicianData);
        alert("Músico atualizado com sucesso");
      } else {
        await api.post("/musician", musicianData);
        alert("Músico criado com sucesso");
      }
      router.push("/listMusicians");
    } catch (error: any) {
      console.error("Erro ao salvar músico:", error);
      alert("Erro ao salvar músico: " + (error.response?.data?.message || "Erro desconhecido"));
    }
  };

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl mb-4">{id ? "Editar Músico" : "Criar Músico"}</h1>
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
            <label className="block text-sm font-medium">Email:</label>
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
            <div className="grid grid-cols-3 gap-2">
              {availableInstruments.map((instrument) => (
                <div key={instrument.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedInstruments.some(
                      (selected) => selected.id === instrument.id
                    )}
                    onChange={() => handleInstrumentChange(instrument)}
                    className="mr-2"
                  />
                  <label>{instrument.name}</label>
                </div>
              ))}
            </div>
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
              disabled={selectedInstruments.length < 1}
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {id ? "Atualizar Músico" : "Criar Músico"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default RegisterMusician;
