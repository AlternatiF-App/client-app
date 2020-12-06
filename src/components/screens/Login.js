import React, { useState, useEffect, useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()  => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const LoginSubmit = () => {
        fetch("http://localhost:8000/api/login/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log("login",  data)
            if(data.detail){
                M.toast({html: data.detail, classes:"#c62828 red darken-3"})
            }else{
                localStorage.setItem("refresh", data.tokens.refresh)
                localStorage.setItem("access token", data.tokens.access)
                localStorage.setItem("user", data.username)
                localStorage.setItem("id_user", JSON.stringify(data.id))
                localStorage.setItem("email", data.email)
                dispatch({type:"USER", payload:data.username})
                M.toast({html: "SignIn Successfully!", classes:"#43a047 green darken-1"})
                history.push('/home')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-login">
            <div className="form-login">
                <h5><strong>LOGIN</strong></h5>
                <div className="input-field">
                    <input name="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input name="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <label>Password</label>
                </div>
                <button className="input-field btn-login btn waves-effect waves-light"  
                    onClick={() => LoginSubmit()}>
                        Login
                </button>
            </div>
        </div>
    )
}

export default Login