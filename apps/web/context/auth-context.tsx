"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    address?: string;
}

interface AuthContextType {
    isLogin: boolean;
    user: User | null;
    login: (email: string) => void;
    register: (email: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Load auth state from localStorage on mount (mock persistence)
    useEffect(() => {
        const storedAuth = localStorage.getItem("crochet_auth");
        if (storedAuth) {
            const { isLogin: storedLogin, user: storedUser } = JSON.parse(storedAuth);
            setIsLogin(storedLogin);
            setUser(storedUser);
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem("crochet_auth", JSON.stringify({ isLogin, user }));
    }, [isLogin, user]);

    const login = (email: string) => {
        setIsLogin(true);
        // Mock user data
        setUser({
            name: email.split("@")[0] || "User",
            email: email,
            avatar: "https://github.com/shadcn.png",
            phone: "0901234567",
            address: "123 Crochet Street, Handmade City"
        });
        router.push("/profile");
    };

    const register = (email: string, name: string) => {
        setIsLogin(true);
        setUser({
            name: name,
            email: email,
            avatar: "https://github.com/shadcn.png",
            phone: "",
            address: ""
        });
        router.push("/profile");
    };

    const logout = () => {
        setIsLogin(false);
        setUser(null);
        localStorage.removeItem("crochet_auth");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isLogin, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
