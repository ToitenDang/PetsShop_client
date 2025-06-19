import { useState, createContext, useContext, useEffect } from "react";
import { CheckTokenFetch, UserFetch } from "~/REST-API-client";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    // console.log("re-render-authen")
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    useEffect(() => {
        // const params = new URLSearchParams(window.location.search);
        // const token = params.get('token');
        const token = getCookie('access_token');
        if (token) {
            localStorage.setItem("access_token", token);
        }
        if (user == null) {
            CheckTokenFetch.post()
                .then(data => {
                    // console.log(data);
                    const userId = data.data.id;
                    UserFetch.getById(userId)
                        .then(userInfo => {
                            // console.log(userInfo.data)
                            if (userInfo.data.state === 0) {
                                setUser(null);
                            } else {
                                setUser(userInfo.data)
                            }
                        });
                })
                .catch(err => {
                    setUser(null);
                })
        }
    }, [])
    const authenUser = user => {
        setUser(user)
    }
    const clearAuthenUser = () => {
        setUser(null)
    }
    // Method to update the cart in the state
    const updateCart = (newCart) => {
        setUser((prevUser) => ({
            ...prevUser,
            cart: newCart, // Cập nhật giỏ hàng mới
        }));
    };

    return (
        <AuthContext.Provider value={{ user, authenUser, clearAuthenUser, updateCart }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}