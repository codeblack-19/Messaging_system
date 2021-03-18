import React, {} from "react"
import Header from "../Components/header"
import Leftpane from "../Components/LeftPane"
import Rightpane from "../Components/Rightpane"
import "../Styles/Main.css"

export default function Mainpage(){
    return(
        <div className="_mainWrapper">
            <Header />
            <div className="_pane">
                <Leftpane />
                <Rightpane />
            </div>
        </div>
    )
}