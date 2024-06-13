import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


console.log('old:  '+ localStorage.getItem('token'));

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const updateToken = () => {
        if (token) {
            const config = {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .post("https://lebruce.ru/api/v1/auth/refresh-token", {}, config)
                .then((response) => {
                    const newToken = response.data.token;
                    const tokenExpirationTime = response.data.expires_in;

                    // сохраняем новый токен и время его истечения в локальное хранилище
                    localStorage.setItem("token", newToken);
                    localStorage.setItem("tokenExpirationTime", tokenExpirationTime);

                    setIsAuthenticated(true);
                    sessionStorage.setItem("tokenUpdated", true);
                })
                .catch((error) => {
                    console.error("Ошибка при обновлении токена:", error);
                    setIsAuthenticated(false);
                });
        }
    };

    // Вызываем updateToken при первом монтировании компонента
    useEffect(() => {
        updateToken();
    }, []);

    // Проверяем время истечения токена каждые 10 секунд
    useEffect(() => {
        const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");

        if (tokenExpirationTime) {
            const interval = setInterval(() => {
                const currentTime = Math.floor(Date.now() / 1000);

                if (currentTime >= tokenExpirationTime) {
                    // удаляем токен из локального хранилища
                    localStorage.removeItem("token");
                    // удаляем время истечения токена из локального хранилища
                    localStorage.removeItem("tokenExpirationTime");
                    setIsAuthenticated(false);
                    clearInterval(interval);
                }
            }, 10000);

            // Возвращаем функцию для очистки интервала при размонтировании компонента
            return () => {
                clearInterval(interval);
            };
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, token, setToken, updateToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};



console.log('new:   '+ localStorage.getItem('token'));