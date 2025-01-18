import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})
export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    const [luser, setLuser] = useState(null)


    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setLuser(JSON.parse(localStorage.getItem("user")));
                setReady(true);
            });
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready, luser }}>
            {children}
        </UserContext.Provider>
    )
}