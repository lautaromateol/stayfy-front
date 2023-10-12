import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);

    console.log("info token", user)
    useEffect(() => {
        const token = localStorage.getItem('logged');

        if (token) {
            // Decodificar el token JWT
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const email = user.email;
                    const response = await fetch(`http://localhost:3001/users/search/${email}`);

                    if (response.ok) {
                        const userData = await response.json();

                        if (userData.userId) {
                            setId(userData.userId);
                        } else {
                            console.error('No se encontró el ID del usuario.');
                        }
                    } else {
                        console.error('La respuesta del servidor no fue exitosa.');
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            }
        };

        fetchData();
    }, [user]);
    console.log("id: ",id);

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
        <UserContext.Provider value={{id, user, signIn, signOut, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}
