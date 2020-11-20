import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const ref_token = localStorage.getItem("refresh")

    const onLogout = () => {
        fetch("http://localhost:8000/api/logout/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            },
            body:JSON.stringify({
                refresh:ref_token
            })
        })
        .then(res => res.json())
        .then(results => {
            console.log("logout", results)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const renderList = () =>  {

        if(state){
            return [
                <li><Link to="/siswa">Siswa</Link></li>,
                <li><Link to="/minat">Minat</Link></li>,
                <li><Link to="/tentang">Tentang</Link></li>,
                <li><Link to="/bantuan">Bantuan</Link></li>,
                <li onClick={() => {
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/')
                }}>
                    Logout
                </li>
            ]
        }else{
            return [
                <li><Link to="/">Sign In</Link></li>
            ]
        }
    }
    return (
        <nav className="black lighten-1" role="navigation">
            <div className="nav-wrapper container"><Link to="/home" id="logo-container" className="brand-logo">Alternatif</Link>
                {<ul className="right hide-on-med-and-down">
                    {renderList()}
                </ul>}
            </div>
        </nav>
    )
}

export default Navbar;