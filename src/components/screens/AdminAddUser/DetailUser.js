import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

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
        <div>
            {data.username}
        </div>
    )
}
