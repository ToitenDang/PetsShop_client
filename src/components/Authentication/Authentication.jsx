import {useState, createContext, useContext, useEffect } from "react";
import { CheckTokenFetch, UserFetch} from "~/REST-API-client";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(user == null) {    
            CheckTokenFetch.post()
                .then(data => {
                    // console.log(data);
                    const userId = data.data.id;
                    UserFetch.getById(userId)
                        .then(userInfo => {
                            // console.log(userInfo.data)
                            setUser(userInfo.data)
                        });
                })
                .catch(err => {
                    setUser(null);
                })
        }
    },[])
    const authenUser = user => {
        setUser(user)
    }
    const clearAuthenUser = () => {
        setUser(null)
    }

    return (
    <AuthContext.Provider value={{user, authenUser, clearAuthenUser}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}