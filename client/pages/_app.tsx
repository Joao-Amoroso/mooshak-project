import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SocketProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </SocketProvider>
    );
}
export default MyApp;
