/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react"
import {Modal, Button} from "react-bootstrap"
import axios from "axios"

export default function SignUp(){
    const [show, setShow] = useState(false);
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('')
    const [isloading, setisloading] = useState(false)

  const handleClose = () => {setShow(false); setsuccess(''); seterror(''); setisloading('')}
  const handleShow = () => setShow(true);

  const [user, setuser] = useState({
      email : "",
      password : "",
      c_password : null,
  })

  function showpassword(){
      var pass = document.getElementById('pp')
      var c_pass = document.getElementById('cp')
      var sh = document.getElementById('sh')

      if (pass.getAttribute('type') === 'password' && c_pass.getAttribute('type') === 'password'){
            pass.setAttribute('type','text')
            c_pass.setAttribute('type','text')
            sh.innerText = 'Hide password'

      }else {
          pass.setAttribute('type', 'password')
          c_pass.setAttribute('type', 'password')
          sh.innerText = 'Show password'
      }
  }

  function Signup(){
      setisloading(true)
    if(user.email === ""){
        return seterror('Email is required')
    }else if(user.password === ""){
        return seterror('Password is required')
    }else if(user.c_password === null){
        return seterror('Please confirm your password')
    }else if(user.password !== user.c_password){
        return seterror('Passwords do not match')
    }else{

        axios.post('http://localhost:3001/auth/api/v1/signUp', {
            email : user.email, 
            password : user.password
        }).then((res) => {
            if(res.data === ""){
                document.getElementById('em').value = "";
                document.getElementById('pp').value = "";
                document.getElementById('cp').value = "";
                return seterror("User Already exists")
               
            } else {
                document.getElementById('em').value = "";
                document.getElementById('pp').value = "";
                document.getElementById('cp').value = "";
                return setsuccess('SignUp successfull Please verify your email and login')
            }
        }).catch((e) => {
            console.log(e)
        })

    }
  }

  useEffect(() => {
      let mount = true

      if(mount){
          if (error || success){
              setisloading(false)
          }

          if(success){
              seterror('')
          }
      }

      return() => mount = false
  }, [error, success])

  function dataSetter(e){
      var init = user
      init[e.target.name] = e.target.value
      setuser(init)
  }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        SignUp
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>SignUp </Modal.Title>
        </Modal.Header>
            <p className="m-0 text-danger text-center"><small>{error? error : ""}</small></p>
           <p className="m-0 text-success text-center"><small>{success? success : ""}</small></p>
        <Modal.Body>
            <div className="row m-0">
                <input type="email" 
                    placeholder = "Email" 
                    className="form-control mb-1" 
                    name="email"  
                    autoComplete="off"
                    id="em"
                    onChange={(e) => dataSetter(e)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="form-control mb-1" 
                    name="password" 
                    id="pp" 
                    autoComplete="off"
                    onChange={(e) => dataSetter(e)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                     className="form-control mb-1" 
                     name="c_password" 
                     autoComplete="off"
                     id="cp"
                     onChange={(e) => dataSetter(e)}
                />
            </div>
            <p className="m-0">
                <Button variant="light" onClick={() => showpassword()} >
                    <u id="sh">
                        Show password
                    </u>
                </Button>
            </p>
        </Modal.Body>
        <Modal.Footer>
            {
                isloading? (
                    <Button variant="dark" disabled={true}>
                        <FontAwesomeIcon icon={faSpinner} pulse={true} />
                    </Button>
                ) : (
                    <>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="dark" onClick={Signup}>
                            SignUp
                        </Button>
                    </>
                )
            }
          
        </Modal.Footer>
      </Modal>
    </>
  );
}