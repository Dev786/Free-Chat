import React, { createContext, useReducer, useEffect } from 'react';


const User = {
    token: '',
    id: '',
    isAuthenticated: false
}

const userReducer = (state, action) => {
    const user = JSON.parse(localStorage.getItem('user'));
    switch (action) {
        case 'login':
            return {
                ...state,
                isAuthenticated: true,
                token: user.accessToken,
                id: user.userId
            }
        case 'logout':
            localStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                token: ''
            }
    }
}

const AppContext = createContext({ User });
const { Provider } = AppContext;

const AppContextProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, User);
    return (
        <Provider value={{ user, userDispatch }}>{children}</Provider>
    )
}

export { AppContextProvider }
export default AppContext;