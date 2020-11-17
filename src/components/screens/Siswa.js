import React from 'react'
import '../../App.css'
import {Link} from 'react-router-dom'
import FormTambah from './FormTambah'
import ListMinat from './ListMinat'
import UpdateCluster from './Cluster'

class Siswa extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            url : 'http://localhost:8000/',
            viewCompleted: false,
            inputSiswa : false,
            updateSiswa : false,
            detailSiswa : false,
            siswaData : [],
            dataUpdate : 0,
            dataDetail : 0,

            // UPDATE
            nis : null,
            fullname : "",
            id_minat : null,
            math : null,
            science : null,
            indonesian : null
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
                score_math : this.state.math,
                score_science : this.state.science,
                score_indonesian : this.state.indonesian
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("UPDATE", result)
        }).catch(err => {
            console.log(err)
        })
    }

    toggleInput(){
        console.log(this.state.data)
        if (this.state.inputSiswa === true) {
            this.setState({
                inputSiswa: false
            });
        } else {
            this.setState({
                inputSiswa: true
            });
        }
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
        fetch(this.state.url+"api/students/", {
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
                siswaData : result.results
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const {nis, fullname, id_minat,
            math, science,  indonesian
        }  =  this.state
        return(
            <div className="container">
                <div className="section">
                    <div className="row"
                        style={{borderBottom:"1px solid grey"}}>
                        <h3 className="left">Siswa</h3>
                        <i onClick={() => this.toggleInput()}
                            className="medium right material-icons">add_circle
                        </i>
                        <div>
                            {this.state.inputSiswa === true ? (
                                <div>
                                    <FormTambah/>
                                </div>
                            ) : null}
                        </div>
                    </div>

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
                                                            <td><UpdateCluster/></td>
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
                                                <td colSpan="3" className="input-field col s12">
                                                    <ListMinat/>
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
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Siswa