import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

interface AuthContextProps {
    currentUser: firebase.User | null;
    register: (
        email: string,
        password: string
    ) => Promise<firebase.auth.UserCredential>;
    login: (
        email: string,
        password: string
    ) => Promise<firebase.auth.UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updatePassword: (password: string) => Promise<void> | undefined;
    updateEmail: (email: string) => Promise<void> | undefined;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
    undefined
);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

    function register(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email: string) {
        return currentUser?.updateEmail(email);
    }
    function updatePassword(password: string) {
        return currentUser?.updatePassword(password);
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextProps = {
        currentUser,
        register,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateEmail
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
