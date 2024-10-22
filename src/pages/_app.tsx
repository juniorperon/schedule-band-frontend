import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>
        <nav>{/* Links de navegação */}</nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
