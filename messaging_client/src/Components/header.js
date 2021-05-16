/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react"
import React, { useContext} from "react"
import {Navbar, Nav, Button} from "react-bootstrap"
import "../Styles/header.css"
import SignUp from "./SinUp"

function Header({open, setlp}){
    const {loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently} = useAuth0()
    

    function login(){
        loginWithRedirect()
        getAccessTokenSilently()
    }

    function Signout(){
        logout()
    }

    function handletoggle(){
        if(open){
            setlp(!open)
        }else{
            setlp(!open)
        }
    }

    return(
        <div className="header">
            <Navbar bg="dark" expand="lg">

                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => handletoggle()} />

                <Navbar.Brand href="#home">FastText</Navbar.Brand>
                <Nav className="ml-auto">
                    {
                        isAuthenticated ? (
                            <Button className="nav-linkp-1" variant="light" onClick={() => Signout()}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button className="nav-link mr-1 p-1" variant="light" onClick={() => login()}>
                                    Login
                                </Button>
                                <SignUp />
                            </>
                        )
                    }
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header