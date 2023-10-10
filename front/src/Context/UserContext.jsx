import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
// console.log("info token",user);
    useEffect(() => {
        const token = localStorage.getItem('logged');

        if (token) {
            // Decodificar el token JWT
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }
    }, []);

    const isAuthenticated = () => {
        return user !== null;
    };

    const signIn = (token) => {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        localStorage.setItem('logged', token);
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('logged');
    };

    return (
        <UserContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}
