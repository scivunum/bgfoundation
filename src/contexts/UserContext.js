import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ isPublicUser, setIsPublicUser ] = useState(true);
    const [ userDetailLoading, setUserDetailLoading ] = useState(false);

    return <>
        <UserContext.Provider
            value={{
                currentUser, 
                setCurrentUser,
                isPublicUser,
                setIsPublicUser,
                userDetailLoading,
                setUserDetailLoading,
            }}
        >
            { children }
        </UserContext.Provider>
    </>
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}