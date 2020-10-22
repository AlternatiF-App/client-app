import React, { useState, useEffect, useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()  => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [db_pass, setDbPass] = useState("")
    const [db_user, setDbUser] = useState("")

    const LoginSubmit = () => {
        if(username == db_user){
            localStorage.setItem("user", JSON.stringify(db_user))
            dispatch({type:"USER", payload:db_user})
            history.push('/home')
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/users/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {
            result.results.map(i => {
                setDbUser(i.username)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })

    return (
        <div className="container lg-con">
            <form onSubmit={() => LoginSubmit()} className="col s12">
                <div className="center">
                    <h5>LOGIN</h5>
                    <div className="input-field">
                        <input name="username" 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        <label for="nis">Username</label>
                    </div>
                    <div className="input-field">
                        <input name="password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <label for="nis">Password</label>
                    </div>
                    <button className="input-field btn waves-effect waves-light btn-login" 
                        type="submit" 
                        name="action">
                            Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login