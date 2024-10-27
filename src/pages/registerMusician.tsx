import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterMusician() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState<any[]>([]);
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get("http://localhost:3333/instruments").then((response) => {
      setAvailableInstruments(response.data);
    });

    if (id) {
      axios.get(`http://localhost:3333/musician/${id}`).then((response) => {
        const musician = response.data;
        setFullName(musician.fullName);
        setEmail(musician.email);
        setSelectedInstruments(musician.instruments);
      });
    }
  }, [id]);

  const handleInstrumentChange = (instrument: any) => {
    const isSelected = selectedInstruments.some(
      (selected) => selected.id === instrument.id
    );

    setSelectedInstruments((prevSelected) =>
      isSelected
        ? prevSelected.filter((selected) => selected.id !== instrument.id)
        : [...prevSelected, instrument]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const instrumentIds = selectedInstruments.map(
      (instrument) => instrument.id
    );

    try {
      if (id) {
        await axios.put(`http://localhost:3333/musician/${id}`, {
          fullName,
          email,
          instruments: instrumentIds,
        });
        console.log("AQUI");
        alert("Músico atualizado com sucesso");
      } else {
        await axios.post("http://localhost:3333/musician", {
          fullName,
          email,
          instruments: instrumentIds,
        });
        alert("Músico criado com sucesso");
      }
      router.push("/listMusicians");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar músico");
    }
  };

  const handleBack = () => {
    router.push("/home");
  };

  return (
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
            {availableInstruments.map((instrument: any) => (
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
  );
}
