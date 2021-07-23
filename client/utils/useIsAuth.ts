import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useIsAuth = () => {
    const { currentUser } = useAuth()!;
    const router = useRouter();

    useEffect(() => {
        if (currentUser == null) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [currentUser, router]);
};
