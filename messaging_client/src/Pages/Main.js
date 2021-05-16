import React, { useEffect, useState } from "react"
import Header from "../Components/header"
import Leftpane from "../Components/LeftPane"
import Rightpane from "../Components/Rightpane"
import "../Styles/Main.css"
import $ from 'jquery'

export default function Mainpage(){
    const [openlp, setlp] = useState(false);

    useEffect(() => {
        let mount = true;

        if(mount){
            if (openlp === false) {
                $('.LeftPaneWrapper').css({
                    width: '0px',
                    padding: '0px'
                });
            } else {
                $('.LeftPaneWrapper').css({
                    width : '270px',
                    padding: '5px'
                });
            }

            if (window.innerWidth > 605) {
                $('.LeftPaneWrapper').css({
                    width: '300px',
                    padding: '5px'
                });
            }
        }

        return () => mount = false;
    }, [openlp])


    return(
        <div className="_mainWrapper">
            <Header open={openlp} setlp={setlp} />
            <div className="_pane">
                <Leftpane />
                <Rightpane />
            </div>
        </div>
    )
}