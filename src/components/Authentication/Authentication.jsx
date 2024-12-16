import { useState, createContext, useContext, useEffect } from "react";
import { CheckTokenFetch, UserFetch } from "~/REST-API-client";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log("re-render-authen")
    useEffect(() => {
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