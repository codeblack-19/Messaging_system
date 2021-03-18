import React,{} from "react"
import { Route, Switch } from "react-router-dom"
import Mainpage from "../Pages/Main"

export default function Navigation(){
    return(
        <Switch>
            <Route exact path="/" component={Mainpage} />
        </Switch>
    )
}