import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

export default function AddUser() {

    var [username, setUsername] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [teacher_class, setClass] = useState(null)

    const history = useHistory()

    const onSubmit = () => {
        fetch("http://localhost:8000/api/register/",  {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password,
                teacher_class
            })
        })
        .then(res => res.json())
        .then(results => {
            console.log("ADDUSER", results)
            if(results){
                history.push("/home")
            }else{
                history.push("/get-users")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <h4>Tambah User</h4>

                    <div className="input-field col s6">
                        <input name="username" 
                            type="text" 
                            className="validate"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        <label for="username">Username</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="email" 
                            type="email" 
                            className="validate"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <label for="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="password" 
                            type="password" 
                            className="validate"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <label for="password">Password</label>
                    </div>

                    <div className="input-field col s6">
                        <select className="browser-default"
                            name="teacher_class"
                            value={teacher_class}
                            onChange={(e) => setClass(e.target.value)}>
                                <option disabled selected>Pilih Kelas</option>
                                <option name="teacher_class" value="1">1 (Satu)</option>
                                <option name="teacher_class" value="2">2 (Dua)</option>
                                <option name="teacher_class" value="3">3 (Tiga)</option>
                                <option name="teacher_class" value="4">4 (Empat)</option>
                                <option name="teacher_class" value="5">5 (Lima)</option>
                                <option name="teacher_class" value="6">6 (Enam)</option>
                        </select>
                    </div>

                    <div>
                        <button class="btn waves-effect waves-light col s6" 
                            type="submit" 
                            name="action"
                            onClick={() => onSubmit()}>
                                Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
