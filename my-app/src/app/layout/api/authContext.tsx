import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

// Define a type for the authentication context value
interface AuthContextType {
    accessToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
    isAuthenticated: () => boolean;
    username: string | null;
    userId: string | null;
    role: string | null;
}

// Create the context with the type definition
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the authentication context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Define a type for the children prop in the AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    console.log('AuthProvider is rendering');
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get('accessToken') || null);
    const [role, setRole] = useState<string | null>(Cookies.get('role') || null);
    const [username, setUsername] = useState<string | null>(Cookies.get('username') || null);
    const[userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await axios.post('https://localhost:7226/api/Authenticate/login/', { username, password });
            console.log('Login Response:', response.data);
            setAccessToken(response.data.token); // Store access token in state
            setRole(response.data.userRoles);
            setUsername(response.data.username);
            setUserId(response.data.userId);

            // Store in cookies
            Cookies.set('accessToken', response.data.token, { expires: 7 }); // Expires in 7 days
            Cookies.set('role', response.data.userRoles, { expires: 7 });
            Cookies.set('username', response.data.username, { expires: 7 });
            Cookies.set('userId', response.data.userId, {expires: 7});
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        setAccessToken(null);
        setRole(null);
        setUsername(null);

        // Clear cookies
        Cookies.remove('accessToken');
        Cookies.remove('role');
        Cookies.remove('username');
        Cookies.remove('userId');
    };

    const refreshAccessToken = async (): Promise<void> => {
        try {
            const response = await axios.post('https://localhost:7226/api/Authenticate/refresh-token');
            setAccessToken(response.data.token); // Update the access token in state
            
            // Update cookie
            Cookies.set('accessToken', response.data.token, { expires: 7 });
        } catch (error) {
            console.error("Failed to refresh token", error);
        }
    };

    const isAuthenticated = (): boolean => !!accessToken;

    const value: AuthContextType = {
        accessToken,
        login,
        logout, // Provide the logout method
        refreshAccessToken,
        isAuthenticated,
        username,
        role,
        userId
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
