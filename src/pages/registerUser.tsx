import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/shared/services/api";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await api.post("/auth/signUp", {
        email,
        password,
      });
      alert("Conta criada com sucesso! Você já pode fazer login.");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      alert("Ocorreu um erro ao criar a conta. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4">Criar Conta</h1>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Criar Conta
        </button>

        <div className="mt-4 text-center">
          <p>
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-500 underline"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
