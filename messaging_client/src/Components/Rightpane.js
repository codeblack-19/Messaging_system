/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useRef } from "react"
import { Button } from "react-bootstrap"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "../Styles/_rp.css"
import Context from "../ModelContext/UserContext"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

function Rightpane() {
    const {isAuthenticated} = useAuth0()
    const [userdata, setuserdata] = useContext(Context)
    const [message, setmessage] = useState("")
    const [messages, setmessages] = useState([])
    const inputRef = useRef()

    function Sendmessage(){
        if (userdata.blockedIds !== undefined){
            if (userdata.blockedIds.length !== 0){
                userdata.blockedIds.forEach(element => {
                    if (element._id === userdata.currentlyChatting) {
                        return alert("Please Unblock the user to unable chat")
                    } else {
                        if (isAuthenticated && message !== "") {
                            var chzone = document.getElementById('_chtzone');
                            axios.post('http://localhost:3001/users/api/v1/message', { Uid: userdata._id, Oid: userdata.currentlyChatting, message: message })
                                .then((doc) => {
                                    setmessage("")
                                    inputRef.current.value = ""
                                    setTimeout(() => {
                                        chzone.scrollTop = chzone.scrollHeight;
                                    }, 500)
                                }).catch((e) => {
                                    console.log(e.message)
                                })
                        } else if (message === "") {
                            alert("Please Enter a message or check if you've logged in")
                        }
                    }
                })
            }else{
                if (isAuthenticated && message !== "") {
                    var chzone = document.getElementById('_chtzone');
                    axios.post('http://localhost:3001/users/api/v1/message', { Uid: userdata._id, Oid: userdata.currentlyChatting, message: message })
                        .then((doc) => {
                            setmessage("")
                            inputRef.current.value = ""
                            setTimeout(() => {
                                chzone.scrollTop = chzone.scrollHeight;
                            }, 500)
                        }).catch((e) => {
                            console.log(e.message)
                        })
                } else if (message === "") {
                    alert("Please Enter a message or check if you've logged in")
                }
            }
            
        }

        
    }

    useEffect(() => {
        let mount = true
        
        if(mount){
            axios.get('http://localhost:3001/users/api/v1/messages/' + userdata._id + '/' + userdata.currentlyChatting)
                .then((doc) => {
                    setmessages(doc.data)
                }).catch((e) => {
                    console.log(e.message)
                })
        }

        return () => {
            mount = false
        }
    },[messages])

    useEffect(() => {
        let mount = true;
        if(mount){
            setTimeout(() => {
                var chzone = document.getElementById('_chtzone');
                chzone.scrollTop = chzone.scrollHeight;
            },3000)
        }

        return () => mount = false;
    },[])

    return (
        <div className="rightPane">
            <div className="_rp_header">
                {
                    userdata.currentlyChatting === "" || userdata.currentlyChatting === undefined ? (
                        <h5 className="m-2">Select a User to Chart with</h5>
                    ) : (
                        <CurrentlyChatting id={userdata.currentlyChatting} />
                    )
                }
            </div>
            <div className="_ChartZone" id="_chtzone">
                {
                    messages.map((item, i) => {
                        return(
                            <div className={`_message ${(item.Id[0] === userdata._id || item.Id[0] === userdata._id)  && "me"}`} key={i}>
                                <p className="_ms_main">
                                    {item.Message}
                                </p>
                                <p className="_ms_date text-right">
                                    <small>{item.date}</small>
                                </p>
                            </div>
                        )
                    })
                }
                
            </div>
            <div className="_messageBox">
                <div className="_inputBox">
                    <textarea 
                        type="text" 
                        autoComplete="off"
                         autoCapitalize="off"
                         ref={inputRef} 
                         onChange={(e) => setmessage(e.target.value)}
                         id="textBox"
                         >
                    </textarea>
                </div>
                <div className="send_button" onClick={() => Sendmessage()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    )
}

function CurrentlyChatting({id}){
    const [currentlyChatting, setcurrChatting] = useState({})
    const [userdata, setuserdata] = useContext(Context)

    useEffect(() => {
        let mount = true

        axios.get('http://localhost:3001/users/api/v1/getUserId/' + id).then((doc1) => {
            if (mount) {
                setcurrChatting(doc1.data)
            }
        })

        return () => mount = false
    },[currentlyChatting])

    function Blockuser(){
        var blocks = userdata.blockedIds
        blocks.push(currentlyChatting)

        axios.post('http://localhost:3001/users/api/v1/blockuser', {
            block : blocks,
            id : userdata._id
        }).then((doc) => {
            console.log(doc.data)
        })
    }

    function Unblock(){
        var blocks = userdata.blockedIds
        // console.log(blocks)
        blocks = blocks.filter(e => e._id !== currentlyChatting._id)

        axios.post('http://localhost:3001/users/api/v1/unblock', {
            block: blocks,
            id: userdata._id
        }).then((doc) => {
            console.log(doc.data)
        })
    }

    return(
        <>
            <div className="_userSelected">
                <div className="_sl_userBox">
                    <div className="_userimage">
                        <img src={currentlyChatting.pic} alt="..." />
                    </div>
                    <div className="_userEmail_text">
                        <p>{currentlyChatting.email}</p>
                    </div>
                </div>
            </div>
            {
                userdata.blockedIds.length === 0 ? (

                    <Button variant="light" className="_sl_btn" onClick={() => Blockuser()}>
                        Block
                    </Button>
                ) : (
                    userdata.blockedIds.map((item, i) => {
                        if(item._id === id){
                            return(
                                <Button variant="light" className="_sl_btn" key={i} onClick={() => Unblock()}>
                                    Unblock
                                </Button>
                            )
                        }else{
                            return(
                                <Button variant="light" className="_sl_btn" onClick={() => Blockuser()}>
                                    Block
                                </Button>
                            )
                        }
                    })
                )
            }
        </>
    )
}

export default Rightpane;