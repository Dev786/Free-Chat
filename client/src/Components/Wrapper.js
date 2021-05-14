import React, { useContext } from 'react';
import AppContext from './AppContext/appContext';
import Home from './Home/Home';
import Login from './Login/Login';

const Wrapper = () => {
    const { user } = useContext(AppContext);
    if (!user.isAuthenticated) {
        return <Login></Login>
    } else {
        return <Home></Home>
    }
}

export default Wrapper;