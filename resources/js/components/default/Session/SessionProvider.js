import React, {
    useState,
    useContext,
    useEffect,
} from "react";

import Loading from "../Loading/Loading";
import VerifyFirst from "../../pages/EmailVerification/VerifyFirst";
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

export function WithSessionLogged({ children }) {
    const user = useAuth();
    const getUser = useAuthUpdate();

    useEffect(() => {
        getUser();
    }, []);

    if (user && user?.email_verified_at == null) {
        return <VerifyFirst />;
    }

    return user == null ? (
        <Loading />
    ) : Object.keys(user).length > 0 ? (
        children
    ) : (
        <Navigate to={"/login"} />
    );
}

export function WithSession({ children }) {
    const user = useAuth();
    const getUser = useAuthUpdate();

    useEffect(() => {
        getUser();
    }, []);

    if (user && user?.email_verified_at == null) {
        return <VerifyFirst />;
    }

    return user == null ? (
        <Loading />
    ) : Object.keys(user).length > 0 ? (
        <>
            {user?.role.toLowerCase() == "employee" ? (
                <Navigate to={`/employee`} />
            ) : user?.role == "admin" || user.role == "administrator" ? (
                <Navigate to={`/admin/users`} />
            ) : (
                <Navigate to={`/employer/dashboard`} />
            )}
        </>
    ) : (
        children
    );
}

export function WithSessionAdmin({ children }) {
    const user = useAuth();
    const getUser = useAuthUpdate();

    useEffect(() => {
        getUser();
    }, []);

    return user == null ? (
        <Loading />
    ) : Object.keys(user).length > 0  && user?.role == "admin" ? (
            children
    ) : (
        <Navigate to={"/login"} />
    );
}

export function Navigate({ children, to }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    }, []);

    return <div>{children}</div>;
}