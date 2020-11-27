import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const username = localStorage.getItem("user")

    const renderList = () =>  {
        if(username === 'admin'){
            return [
                <li><Link to="/admin-siswa">Siswa</Link></li>,
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
                <li><Link to="/siswa">Siswaku</Link></li>,
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