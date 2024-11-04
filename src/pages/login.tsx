import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/shared/contexts/AuthContext";

const Login: React.FC = () => {
  const { login, isAuthenticated, errorMessage } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home'); 
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4">Login</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
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
            onClick={() => router.push("/registerUser")} 
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
