/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import Context from "../ModelContext/UserContext";
import "../Styles/_lp.css"

function Leftpane(){
    const {isAuthenticated, user} = useAuth0()
    const [userdata, setuser] = useContext(Context)
    const [online, setOnline] = useState([])


    useEffect(() => {
        let mount = true

        axios.get('http://localhost:3001/users/api/v1/getisOnline')
            .then((doc) => {
                if (mount) {
                    
                    setOnline(doc.data)
                }
            }).catch((e) => {
                console.log(e.message)
            })

        return () => mount = false;
    },[online])


    function OpenChart(id){
        axios.get(`http://localhost:3001/users/api/v1/OpenChart/${userdata._id}/${id}`)
            .then((doc) => {
                if(doc.data === 'done'){
                    console.log('done')
                }
            }).catch((e) => {
                console.log(e)
            })
    }

    return(
        <div className="LeftPaneWrapper">
            <div className="_lp_inner">
                {
                    isAuthenticated? (
                        <div className="_userBox">
                            <div className="_userimage">
                                <img src={user.picture} alt="..." />
                            </div>
                            <div className="_userEmail">
                                <p className="m-0 text-truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                            <div className="_userBox">
                                <div className="_userimage">
                                    <img src="https://picsum.photos/id/2/100/100" alt="..." />
                                </div>
                                <div className="_userEmail">
                                    <p className="m-0">...........</p>
                                </div>
                            </div>
                    )
                }
                <hr className="m-1"/>
                <div className="_onlineUsers">
                    <div className="_ol_header">
                        <h3>Online Users</h3>
                    </div>
                    <div className="_all_ol_users">
                        {
                            online.map((item, i) => {
                                if(item._id !== userdata._id){
                                    return (
                                        <div className="_ol_userBox" key={i} onClick={() => { OpenChart(item._id)}}>
                                            <div className="_userimage">
                                                <img src={item.pic} alt="..." />
                                            </div>
                                            <div className="_userEmail_text">
                                                <p>{item.email}</p>
                                                <p>Hey! am online</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                        
                    </div>
                </div>
                <div className="_blockedUsers">
                    <div className="_bl_users_head">
                        <h3>Blocked Users</h3>
                    </div>
                    <div className="_blocked_users">
                        {
                            userdata.blockedIds === undefined ? (
                                ""
                            ) : (
                                userdata.blockedIds.map((item, i) => {
                                    return(
                                        <div className="_bl_userBox" key={i}>
                                            <div className="_userimage">
                                                <img src={item.pic} alt="..." />
                                            </div>
                                            <div className="_userEmail_text">
                                                <p>{item.email}</p>
                                                <p>oh! you blocked</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leftpane;