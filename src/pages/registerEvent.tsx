import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterEvent() {
  const [date, setDate] = useState("");
  const [musicians, setMusicians] = useState([]);
  const [selectedMusicians, setSelectedMusicians] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/musicians")
      .then((response) => setMusicians(response.data))
      .catch((error) => console.error("Error fetching musicians", error));
  }, []);

  const handleMusicianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const musicianId = Number(e.target.value);
    setSelectedMusicians((prev) =>
      prev.includes(musicianId)
        ? prev.filter((id) => id !== musicianId)
        : [...prev, musicianId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/events", {
        date,
        musicianIds: selectedMusicians,
      });
      alert("Event created successfully");
    } catch (error) {
      console.error("Failed to create event", error);
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Musicians:</label>
        {musicians.map((musician) => (
          <div key={musician.id}>
            <input
              type="checkbox"
              value={musician.id}
              onChange={handleMusicianChange}
            />
            {musician.fullName} ({musician.instruments.join(", ")})
          </div>
        ))}
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}
