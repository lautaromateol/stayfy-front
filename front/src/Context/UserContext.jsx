import React, { createContext, useContext, useEffect, useState } from 'react';
import {BACKEND_URL, FRONT_URL} from "../../utils"
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [userData, setUserData] = useState({
        userId: null,
        isAdmin: false,
        isSuperAdmin: false,
    });
    
    // console.log("info token", user)
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
                    const response = await fetch(`${BACKEND_URL}/users/search/${email}`);

                    if (response.ok) {
                        const userData = await response.json();

                        if (userData.userId) {
                            setId(userData.userId);
                            setUserData(userData);
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
        setUserData({
            userId: null,
            isAdmin: false,
            isSuperAdmin: false,
        });
        localStorage.removeItem('logged')
        window.location.href = FRONT_URL
    };


    return (
        <UserContext.Provider value={{id, userData, user, signIn, signOut, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}
