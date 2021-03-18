/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react"
import React, { useContext} from "react"
import {Navbar, Nav, Button} from "react-bootstrap"
import "../Styles/header.css"
import SignUp from "./SinUp"
import axios from "axios"
import Context from "../ModelContext/UserContext"

function Header(){
    const {loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently} = useAuth0()
    const [userdata, setuserdata] = useContext(Context)
    
    // getAccessTokenSilently()

    function login(){
        loginWithRedirect()
        getAccessTokenSilently()
    }

    function Signout(){
        logout()
    }

    return(
        <div className="header">
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">FastText</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {
                            isAuthenticated ? (
                                <Button className="nav-link mr-2" variant="light" onClick={() => Signout()}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button className="nav-link mr-2" variant="light" onClick={() => login()}>
                                        Login
                                    </Button>
                                    <SignUp />
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header