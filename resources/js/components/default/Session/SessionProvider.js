import React, {
    useState,
    useContext,
    useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import ValidateToken from "./ValidateToken";


export const UserContext = React.createContext();
export const UserUpdateContext = React.createContext();
export function useAuth() {
    return useContext(UserContext);
}

export function useAuthUpdate() {
    return useContext(UserUpdateContext);
}

export default function UserProvider({ children }) {
    const [User, setUser] = useState(null);

    const getUser = async () => {
        const user = await ValidateToken();

        if (JSON.stringify(user) != JSON.stringify(User)) {
            setUser(user);
        }
    };

    return (
        <UserContext.Provider value={User}>
        <UserUpdateContext.Provider value={getUser}>
                {children}
        </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

