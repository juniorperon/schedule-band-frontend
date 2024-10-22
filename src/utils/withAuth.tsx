import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:3000/auth/validate-token", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => setIsAuthenticated(true))
          .catch(() => {
            localStorage.removeItem("token");
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
    }, [router]);

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
};
