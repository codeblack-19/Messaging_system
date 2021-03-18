/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import React, { createContext, useEffect, useState } from "react"

export const Context = createContext()

export const UserContext = ({children}) => {
    const {user, isAuthenticated, getIdTokenClaims } = useAuth0()
    const [userdata, setUserData] = useState([])


    useEffect(() => {
        let mount = true;
        
        if (isAuthenticated) {
            axios.get('http://localhost:3001/users/api/v1/getUser/' + user.email)
                .then((doc1) => {
                    if (mount) {
                        setUserData(doc1.data)
                    }
                })
            sessionStorage.setItem('_ujsh', userdata._id)
        }else{
            axios.get('http://localhost:3001/users/api/v1/offline/' + sessionStorage.getItem('_ujsh'))
                .then((doc) => {
                }).catch((e) => {
                    console.log(e)
                })
        }


        return () => mount = false;
    },[userdata, isAuthenticated])


    return(
        <Context.Provider value={[userdata, setUserData]}>
            {children}
        </Context.Provider>
    )
}

export default Context