import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Avatar from 'react-avatar';

export default function DetailUser() {

    var {userid} = useParams()
    var [data, setData] = useState([])
    var url = "http://localhost:8000/"

    useEffect(() => {
        fetch(`${url}api/detail-user/${userid}/`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(results => {
            console.log("detail user",results)
            setData(results)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <h1 className="left col s12">Detail User</h1>
                    <Avatar size="90pt" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data.username} />
                    <div>
                        <p className="col s6">ID : </p>
                        <p className="col s6">{data.id}</p>
                    </div>                    
                    <div>
                        <p className="col s6">Nama : </p>
                        <p className="col s6">{data.username}</p>
                    </div>                    
                    <div>
                        <p className="col s6">Email : </p>
                        <p className="col s6">{data.email}</p>
                    </div>                    
                    <div>
                        <p className="col s6">Wali kelas : </p>
                        <p className="col s6">{data.teacher_class}</p>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
