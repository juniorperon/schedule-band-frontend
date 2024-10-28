import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      // if (token) {
      //   axios
      //     .get("http://localhost:3000/auth/validate-token", {
      //       headers: { Authorization: `Bearer ${token}` },
      //     })
      //     .then(() => setIsAuthenticated(true))
      //     .catch(() => {
      //       localStorage.removeItem("token");
      //       router.push("/login");
      //     });
      // } else {
      //   router.push("/login");
      // }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
