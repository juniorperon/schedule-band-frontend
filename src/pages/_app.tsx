// pages/_app.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../app/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/login") {
      router.push("/login");
    } else if (token && router.pathname === "/login") {
      router.push("/home");
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
