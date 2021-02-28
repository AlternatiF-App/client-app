import React, { Component } from 'react'
import ListMinat from './ListMinat'
import '../../App.css'
import {Link} from 'react-router-dom'
import {getAllIDStudents,  getAllClusters, updateAllClusters} from '../../services/students'

export default class ListMyStudents extends Component {

    constructor(props){
        super(props)

        this.state = {
            url : 'http://localhost:8000/',
            url_student : 'http://localhost:8000/api/students/',
            prev_url : '',
            next_url : '',
            viewCompleted: false,
            updateSiswa : false,
            detailSiswa : false,
            siswaData : [],
            dataUpdate : 0,
            dataDetail : 0,
            loading: true,

            // UPDATE
            nis : null,
            fullname : "",
            id_minat : null,
            math : null,
            science : null,
            indonesian : null,
            student_class: null,

            idStudents : [],
            clustersStudents : []
        };
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    onUpdate = e =>{
        e.preventDefault()

        fetch(this.state.url+"api/students/"+this.state.nis+"/", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            },
            body:JSON.stringify({
                id : this.state.nis,
                fullname : this.state.fullname,
                id_minat : 1,
                student_class: this.state.student_class,
                score_math : this.state.math,
                score_science : this.state.science,
                score_indonesian : this.state.indonesian,
                teacher:localStorage.getItem("id_user")
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("UPDATE", result)
        }).catch(err => {
            console.log(err)
        })
    }

    toggleUpdate(id){
        this.setState(
            {
                dataUpdate: id
            },
            () => {
                console.log(this.state.dataUpdate);
            }
        );
        if (this.state.updateSiswa === true) {
            this.setState({
                updateSiswa: false
            });
        } else {
            this.setState({
                updateSiswa: true
            });
        }
    }

    toggleDelete(id){
        console.log("ID DELETE", id)
        fetch(this.state.url+"api/students/"+id+"/", {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.fetchListStudents()
        var dataIdStudents = []
        var dataClusters = []   
        async function fetchData() {
            let res = await getAllIDStudents(
                "http://localhost:8000/api/students-update/"
            );
            res.results.map(item=> {
                dataIdStudents.push(item.id)
            })
        }
        
        async function fetchCluster() {
            let res = await getAllClusters(
                "http://localhost:8000/api/clusters/"
            );
            res.clusters.map((i, item) => {
                if(i[item] != ''){
                    dataClusters.push(i)
                }
            })
        }

        fetchData();
        fetchCluster();
        this.setState({
            idStudents : dataIdStudents,
            clustersStudents : dataClusters
        }, () => {
            console.log("IDSTUDENT", this.state.idStudents)
            console.log("IDSTUDENT", this.state.clustersStudents)
        })
    }
    onUp = () => {
        var updateData = []
        var params = {}
        this.state.idStudents.map((item,index=0) => {
            params = {
                "id": item,
                "cluster": this.state.clustersStudents[index]
            }
            updateData.push(params)
        })

        const fetchUpdate = {
            method:"PUT",
            headers:{
                'Accept': 'application/json, text/plain',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updateData)
        } 
        async function fetchUpdateClusters() {
            let res = await updateAllClusters(
                "http://localhost:8000/api/update-clusters/",
                fetchUpdate
            );
            console.log("UPDATE", res)
        }
        fetchUpdateClusters()
        window.location.reload()
    }

    fetchListStudents(){
        fetch(this.state.url_student+localStorage.getItem("user")+'/', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                prev_url : result.prev,
                next_url : result.next,
                siswaData : result.results
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    onNext(){
        fetch(this.state.next_url, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                prev_url : result.previous,
                next_url : result.next,
                siswaData : result.results
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    onPrev(){
        fetch(this.state.prev_url, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"Bearer "+localStorage.getItem("access token")
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                prev_url : result.previous,
                next_url : result.next,
                siswaData : result.results
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const {nis, fullname, id_minat, student_class,
            math, science,  indonesian
        }  =  this.state
        return (
            <div>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>NIS</th>
                            <th>Nama</th>
                            <th>Cluster</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.siswaData.map((item, i) =>{ 
                            if(item.cluster == "0" || item.cluster == "1" || item.cluster == "2"){
                                return(
                                <>
                                    <tr key={i.id}>
                                        <td>{item.id}</td>
                                        <td><Link to={"/detail-siswa/"+item.id}>
                                            {item.fullname}
                                        </Link></td>
                                        {
                                            ( item.cluster == "0" ?
                                                <td>Matematika</td> : 
                                                ( item.cluster == "1" ?
                                                    <td>IPA</td> : 
                                                    ( item.cluster == "2" ? 
                                                        <td>B. Indonesia</td> : 
                                                        // <UpdateCluster/>
                                                        <td></td>
                                                    )
                                                )
                                            )
                                        }
                                        <td>
                                            <i className="i-edit  material-icons"
                                                onClick={() => this.toggleUpdate(item.id)}>
                                            edit</i>
                                            <i className="i-delete material-icons"
                                                onClick={() => this.toggleDelete(item.id)}>    
                                            delete</i>
                                        </td>
                                    </tr>
                                    
                                    {this.state.updateSiswa == true &&
                                    this.state.dataUpdate === item.id ? (
                                        <>
                                        <tr>
                                            <td className="input-field col s3">
                                                <input name="nis" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.id}
                                                    value={nis}
                                                    onChange={this.handleChange}/>
                                                <label for="nis">NIS</label>
                                            </td>
                                            <td colSpan="2" className="input-field col s9">
                                                <input name="fullname" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.fullname}
                                                    value={fullname}
                                                    onChange={this.handleChange}/>
                                                <label for="nama">Fullname</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="input-field col s6">
                                                <ListMinat/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="input-field col s6">
                                                <select className="browser-default"
                                                    name="student_class"
                                                    value={student_class}
                                                    onChange={this.handleChange}>
                                                        <option disabled selected>Pilih Kelas</option>
                                                        <option name="student_class" value="1">1 (Satu)</option>
                                                        <option name="student_class" value="2">2 (Dua)</option>
                                                        <option name="student_class" value="3">3 (Tiga)</option>
                                                        <option name="student_class" value="4">4 (Empat)</option>
                                                        <option name="student_class" value="5">5 (Lima)</option>
                                                        <option name="student_class" value="6">6 (Enam)</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="input-field col s4">
                                                <input name="math" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_math}
                                                    value={math}
                                                    onChange={this.handleChange}/>
                                                <label for="math">Nilai Matematika</label>
                                            </td>
                                            <td className="input-field col s4">
                                                <input name="science" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_science}
                                                    value={science}
                                                    onChange={this.handleChange}/>
                                                <label for="science">Nilai IPA</label>
                                            </td>
                                            <td className="input-field col s4">
                                                <input name="indonesian" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_indonesian}
                                                    value={indonesian}
                                                    onChange={this.handleChange}/>
                                                <label for="indonesian">Nilai B. Indonesia</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">
                                                <button class="btn waves-effect waves-light col s3" 
                                                    type="submit" 
                                                    onClick={this.onUpdate}
                                                    name="action">
                                                        Submit
                                                    <i class="material-icons right">send</i>
                                                </button>
                                            </td>
                                        </tr>
                                        </>
                                    ) : null }
                                </>
                                )
                            }else{
                                return(
                                <>
                                    <tr key={i.id}>
                                        <td>{item.id}</td>
                                        <td><Link to={"/detail-siswa/"+item.id}>
                                            {item.fullname}
                                        </Link></td>
                                        
                                        <div>
                                            <button className="btn-update-cluster"
                                                onClick={this.onUp}>
                                                Update Cluster
                                            </button>
                                        </div>
                                        
                                        <td>
                                            <i className="i-edit  material-icons"
                                                onClick={() => this.toggleUpdate(item.id)}>
                                            edit</i>
                                            <i className="i-delete material-icons"
                                                onClick={() => this.toggleDelete(item.id)}>    
                                            delete</i>
                                        </td>
                                    </tr>
                                    
                                    {this.state.updateSiswa == true &&
                                    this.state.dataUpdate === item.id ? (
                                        <>
                                        <tr>
                                            <td className="input-field col s3">
                                                <input name="nis" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.id}
                                                    value={nis}
                                                    onChange={this.handleChange}/>
                                                <label for="nis">NIS</label>
                                            </td>
                                            <td colSpan="2" className="input-field col s9">
                                                <input name="fullname" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.fullname}
                                                    value={fullname}
                                                    onChange={this.handleChange}/>
                                                <label for="nama">Fullname</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="input-field col s6">
                                                <ListMinat/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="input-field col s6">
                                                <select className="browser-default"
                                                    name="student_class"
                                                    value={student_class}
                                                    onChange={this.handleChange}>
                                                        <option disabled selected>Pilih Kelas</option>
                                                        <option name="student_class" value="1">1 (Satu)</option>
                                                        <option name="student_class" value="2">2 (Dua)</option>
                                                        <option name="student_class" value="3">3 (Tiga)</option>
                                                        <option name="student_class" value="4">4 (Empat)</option>
                                                        <option name="student_class" value="5">5 (Lima)</option>
                                                        <option name="student_class" value="6">6 (Enam)</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="input-field col s4">
                                                <input name="math" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_math}
                                                    value={math}
                                                    onChange={this.handleChange}/>
                                                <label for="math">Nilai Matematika</label>
                                            </td>
                                            <td className="input-field col s4">
                                                <input name="science" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_science}
                                                    value={science}
                                                    onChange={this.handleChange}/>
                                                <label for="science">Nilai IPA</label>
                                            </td>
                                            <td className="input-field col s4">
                                                <input name="indonesian" 
                                                    type="text" 
                                                    className="validate"
                                                    placeholder={item.score_indonesian}
                                                    value={indonesian}
                                                    onChange={this.handleChange}/>
                                                <label for="indonesian">Nilai B. Indonesia</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">
                                                <button class="btn waves-effect waves-light col s3" 
                                                    type="submit" 
                                                    onClick={this.onUpdate}
                                                    name="action">
                                                        Submit
                                                    <i class="material-icons right">send</i>
                                                </button>
                                            </td>
                                        </tr>
                                        </>
                                    ) : null }
                                </>
                                )
                            }
                        })
                        }
                    </tbody>
                </table>

                <div>
                    <ul className="pagination right">
                        <li style={{marginRight:"5px", borderRadius:"5px"}} 
                            className="waves-effect active">
                                <a onClick={() => this.onPrev()}>
                                    Prev
                                </a>
                        </li>
                        <li style={{marginLeft:"5px", borderRadius:"5px"}}
                            className="waves-effect active">
                                <a onClick={() => this.onNext()}>
                                    Next
                                </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
