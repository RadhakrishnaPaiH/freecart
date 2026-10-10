import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({children}){
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    },[user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;