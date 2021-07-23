import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
    socket?: Socket;
}

const SocketContext = React.createContext<SocketContextProps>({
    socket: undefined
});

export function useSocket() {
    return useContext(SocketContext);
}

export const SocketProvider: React.FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        newSocket.on("message", (msg) => {
            console.log(msg);
        });

        setSocket(newSocket);
        return () => {
            newSocket.off();
        };
    }, []);

    const values = { socket };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};
