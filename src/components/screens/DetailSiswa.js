import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Avatar from 'react-avatar';
import '../../App.css'

export default function DetailSiswa(){

    var {siswaid} = useParams()
    var [data, setData] = useState([])
    var url = "http://localhost:8000/"

    useEffect(() => {
        fetch(`${url}api/students/${siswaid}/`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log("detail siswa", result)
            setData(result)
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
                <h2 style={{textAlign:"left"}}>Detail Siswa</h2>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                    <div>
                        <Avatar size="150pt" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data.fullname} />
                    </div>
                    <div>
                        <h4>{data.id}</h4>
                        <h4>{data.fullname}</h4>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h5 style={{backgroundColor:"yellow",borderRadius:"8px", padding:"15px"}}>
                                Kelas {data.student_class}
                            </h5>
                        </div>
                    </div>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                    <h5 style={{backgroundColor:"green",borderRadius:"10px", padding:"15px", color:"white"}}>
                        Matematika {data.score_math}
                    </h5>
                    <h5 style={{backgroundColor:"green",borderRadius:"10px", padding:"15px", color:"white"}}>
                        IPA {data.score_science}
                    </h5>
                    <h5 style={{backgroundColor:"green",borderRadius:"10px", padding:"15px", color:"white"}}>
                        B. Indonesia {data.score_indonesian}
                    </h5>
                </div>

                <div style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                    {data.cluster === "0" &&
                        <h4 className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Matematika</strong></h4>
                    }
                    {data.cluster === "1" &&
                        <h4 className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Ilmu Pengetahuan Alam</strong></h4>
                    }
                    {data.cluster === "2" &&
                        <h4 className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Bahasa Indonesia</strong></h4>
                    }
                </div>
            </div>
        </div>
    )
}