import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import '../../App.css'

const DetailSiswa = () => {

    const {siswaid} = useParams()
    const [data, setData] = useState([])
    const url = "http://localhost:8000/"

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
            console.log("COK",result)
            setData(result)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return (
        <div className="container">
            <div className="section">
                    <div className="row">
                        <h1 className="left col s12">Detail Siswa</h1>
                        <div>
                            <p className="col s6">NIS : </p>
                            <p className="col s6">{data.id}</p>
                        </div>
                        <div>
                            <p className="col s6">Nama Lengkap : </p>
                            <p className="col s6">{data.fullname}</p>
                        </div>
                        {data.id_minat == 1 &&
                            <div>
                                <p className="col s6">Minat : </p>
                                <p className="col s6">Matematika</p>
                            </div>
                        }
                        {data.id_minat == 2 &&
                            <div>
                                <p className="col s6">Minat : </p>
                                <p className="col s6">Ilmu Pengetahuan Alam</p>
                            </div>
                        }
                        {data.id_minat == 3 &&
                            <div>
                                <p className="col s6">Minat : </p>
                                <p className="col s6">Bahasa Indonesia</p>
                            </div>
                        }
                        <div>
                            <div>
                                <p className="col s4">Nilai Matematika </p>
                                <p className="col s4">Nilai IPA </p>
                                <p className="col s4">Nilai B. Indonesia </p>
                            </div>
                            <div>
                                <p className="col s4">{data.score_math} </p>
                                <p className="col s4">{data.score_science} </p>
                                <p className="col s4">{data.score_indonesian} </p>
                            </div>
                        </div>

                        {data.cluster == 0 &&
                            <p className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Matematika</strong></p>
                        }
                        {data.cluster == 1 &&
                            <p className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Ilmu Pengetahuan Alam</strong></p>
                        }
                        {data.cluster == 2 &&
                            <p className="col s12">Siswa ini masuk kedalam cluster atau kelas ekstrakurikuler <strong>Bahasa Indonesia</strong></p>
                        }
                    </div>
            </div>
        </div>
    )
}

export default DetailSiswa