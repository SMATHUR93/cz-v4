import type { AppProps } from "next/app";
import AuthProvider from "@/context/AuthContext";
import PersonProvider from "@/context/PersonContext";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <AuthProvider>
        <PersonProvider>
          <Component {...pageProps} />
        </PersonProvider>
      </AuthProvider>
    </div>
  );
}
