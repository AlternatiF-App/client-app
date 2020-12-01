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
        <div style={{
            maxWidth:"850px",
            margin:"90px auto",
        }}>
            <div
                style={{
                    margin:"18px 0px"
                }}
            >
                <h2 style={{textAlign:"center"}}>Detail User</h2>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                    <div>
                        <Avatar size="150pt" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data.username} />
                    </div>
                    <div>
                        <h4>{data.username}</h4>
                        <h4>{data.email}</h4>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>Wali Kelas {data.teacher_class}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
