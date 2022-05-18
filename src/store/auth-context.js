import React, { useState, useEffect } from 'react';

//createContext({}) creates a context object. 
//AuthContext is an object that will contain a component

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}, 
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false); 

    //We could do this with useState but if we do so, we will got to an infinite loop
    //Here we don't have any dependencies so the code will run when the app renders, only once. 
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn'); 

        if (storedUserLoggedInInformation === 'LOGGED_IN'){
        setisLoggedIn(true); 
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn'); 
        setisLoggedIn(false); 
    }
    
    const loginHandler = (email, password) => {
        // we should check email and password, but here it's just a dummy app
        localStorage.setItem('isLoggedIn', '1'); 
        setisLoggedIn(true); 
    }

    return <AuthContext.Provider
        value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
        {props.children}
    </AuthContext.Provider>
}; 

export default AuthContext; 