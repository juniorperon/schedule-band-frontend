import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("LOGIN", email, password);
    try {
      const response = await axios.post("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        email,
        password,
      });

      console.log("RESPONSE", response);
      if (response.data) {
        console.log("OK");
        const { token } = response.data;
        localStorage.setItem("token", token);
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      // Aqui você pode verificar o status do erro para um tratamento específico
      if (error.response) {
        // A resposta do servidor é recebida e contém um erro
        console.log("Erro do servidor:", error.response.data.message);
        alert(error.response.data.message); // Exibe a mensagem de erro retornada
      } else {
        // Qualquer outro erro (ex.: rede)
        alert("Ocorreu um erro ao fazer login. Tente novamente.");
      }

      router.push("/login"); // Redireciona de volta para a tela de login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4">Login</h1>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Entrar
        </button>

        <div className="mt-4 text-center">
          <p>Não tem uma conta?</p>
          <button
            type="button"
            onClick={() => router.push("/registerUser")} // Redireciona para a página de cadastro
            className="text-blue-500 underline"
          >
            Cadastrar-se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
