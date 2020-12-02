import React, {useEffect,  useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function FormTambah() {

    var [minatData, setMinatData] = useState([])
    var [nis, setNis] = useState(null)
    var [fullname, setFullname] = useState("")
    var [id_minat, setMinat] = useState(null)
    var [student_class, setClass] = useState(null)
    var [math, setMath] = useState(null)
    var [science,setScience] = useState(null)
    var [indonesian, setIndonesian] = useState(null)

    const history = useHistory()
    
    useEffect(()  => {
        fetch("http://localhost:8000/api/get-interest/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result.results)
            setMinatData(result.results)
        })
        .catch(err => {
            console.log(err)
        })
    })


    const onSubmit = () => {
        
        fetch("http://localhost:8000/api/students/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            },
            body:JSON.stringify({
                id : nis,
                fullname,
                id_minat,
                student_class,
                score_math : math,
                score_science : science,
                score_indonesian : indonesian,
                teacher:localStorage.getItem("id_user")
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log("POST", result)
            if(result){
                history.push("/siswa")
            }else{
                history.push("/home")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="row">
            <form onSubmit={() => onSubmit()} className="col s12">
                <div className="row">
                    <h4>Tambah Siswa</h4>

                    <div className="input-field col s3">
                        <input name="nis" 
                            type="text" 
                            className="validate"
                            value={nis}
                            onChange={(e) => setNis(e.target.value)}/>
                        <label for="nis">NIS</label>
                    </div>
                    <div className="input-field col s9">
                        <input name="fullname" 
                            type="text" 
                            className="validate"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}/>
                        <label for="nama">Fullname</label>
                    </div>
                    
                    <div className="input-field col s6">
                        <select className="browser-default"
                            name="id_minat"
                            value={id_minat}
                            onChange={(e) => setMinat(e.target.value)}>
                            <option disabled selected>Pilih Minat</option>
                        {
                            minatData.map(item => {
                                return(
                                    <>
                                        <option 
                                            name="id_minat"
                                            value={item.id}>
                                                {item.name}
                                        </option>
                                    </>
                                )
                            })
                        }
                        </select>
                    </div>

                    <div className="input-field col s6">
                        <select className="browser-default"
                            name="student_class"
                            value={student_class}
                            onChange={(e) => setClass(e.target.value)}>
                                <option disabled selected>Pilih Kelas</option>
                                <option name="student_class" value="1">1 (Satu)</option>
                                <option name="student_class" value="2">2 (Dua)</option>
                                <option name="student_class" value="3">3 (Tiga)</option>
                                <option name="student_class" value="4">4 (Empat)</option>
                                <option name="student_class" value="5">5 (Lima)</option>
                                <option name="student_class" value="6">6 (Enam)</option>
                        </select>
                    </div>

                    <div className="input-field col s4">
                        <input name="math" 
                            type="text" 
                            className="validate"
                            value={math}
                            onChange={(e) => setMath(e.target.value)}/>
                        <label for="math">Nilai Matematika</label>
                    </div>
                    <div className="input-field col s4">
                        <input name="science" 
                            type="text" 
                            className="validate"
                            value={science}
                            onChange={(e) => setScience(e.target.value)}/>
                        <label for="science">Nilai IPA</label>
                    </div>
                    <div className="input-field col s4">
                        <input name="indonesian" 
                            type="text" 
                            className="validate"
                            value={indonesian}
                            onChange={(e) => setIndonesian(e.target.value)}/>
                        <label for="indonesian">Nilai B. Indonesia</label>
                    </div>

                    <div>
                        <button class="btn waves-effect waves-light col s3" 
                            type="submit" 
                            name="action">
                                Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
