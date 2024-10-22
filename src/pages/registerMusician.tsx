import { useState } from "react";
import axios from "axios";

export default function RegisterMusician() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [instruments, setInstruments] = useState<string[]>([]);

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
    } catch (error) {
      console.error(error);
      alert("Failed to create musician");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Instruments:</label>
        <div>
          <input
            type="checkbox"
            value="Guitar"
            onChange={handleInstrumentChange}
          />{" "}
          Guitar
          <input
            type="checkbox"
            value="Bass"
            onChange={handleInstrumentChange}
          />{" "}
          Bass
          <input
            type="checkbox"
            value="Drums"
            onChange={handleInstrumentChange}
          />{" "}
          Drums
        </div>
      </div>
      <button type="submit">Create Musician</button>
    </form>
  );
}
