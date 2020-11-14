import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()

    var onLogout = () => {
            
        // var formData = new FormData()
        // formData.append('refresh', localStorage.getItem("refresh"))
        // console.log('logout', formData)

        fetch("http://localhost:8000/api/logout/", {
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("access token"),
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:JSON.stringify({
                refresh:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwNTQyOTY2OSwianRpIjoiZDdiZDYxMjI1MjFjNDRjOWExMzliZDIxOGFmZWVkZmUiLCJ1c2VyX2lkIjoxfQ.BnCpMNDXLHNEFs-TBHmZmN2dA23D3T8oAuZxL4Y1C1Y"
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log('logout', result)
        })

        // fetch("http://localhost:8000/api/logout/", {
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Content-Type":"application/x-www-form-urlencoded",
        //         "Authorization":"Bearer "+localStorage.getItem("access token")
        //     },
        //     body:JSON.stringify({"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwNTQyNzg3MiwianRpIjoiODg1ZDg4YzNkODFkNGViMDhiZGQyYjhjYzJhYjk5NGEiLCJ1c2VyX2lkIjoxfQ.uVV7pOrliXDnsPZbVxrYUoRIkKhbSEtHq9taNPx3C9c"})
        // })
        // .then(res => res.json())
        // .then(result => {
        //     console.log("LOGOUT", result)
        //     if(result.message){
        //         localStorage.clear()
        //         dispatch({type:"CLEAR"})
        //         history.push('/signin')
        //     }else{
        //         M.toast({html: result.detail, classes:"#c62828 red darken-3"})
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    const renderList = () =>  {

        if(state){
            return [
                <li><Link to="/siswa">Siswa</Link></li>,
                <li><Link to="/minat">Minat</Link></li>,
                <li><Link to="/tentang">Tentang</Link></li>,
                <li><Link to="/bantuan">Bantuan</Link></li>,
                <li onClick={onLogout}>
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