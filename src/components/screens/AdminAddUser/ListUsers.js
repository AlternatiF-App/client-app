import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "../../../App.css"

export default class ListUsers extends Component {

    constructor(props){
        super(props)

        this.state = ({
            url : 'http://localhost:8000/',
            UsersData : [],

            formUpdate:false,
            idUpdate:0,
            id:null,
            username:"",
            teacher_class:0
        })
    }

    componentDidMount(){
        fetch(this.state.url+'api/getuser/', {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(results => {
            console.log("user", results)
            this.setState({UsersData:results})
        })
        .catch(error =>  {
            console.log(error)
        })
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    onUpdate = e =>{
        e.preventDefault()

        fetch(this.state.url+"api/getuser/"+this.state.id+"/", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:this.state.id,
                username:this.state.username,
                teacher_class:this.state.teacher_class
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
                idUpdate: id
            },
            () => {
                console.log(this.state.idUpdate);
            }
        );
        if (this.state.formUpdate === true) {
            this.setState({
                formUpdate: false
            });
        } else {
            this.setState({
                formUpdate: true
            });
        }
    }

    toggleDelete(id){
        fetch(this.state.url+'api/getuser/'+id+"/", {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
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

    render() {
        const {id, username, teacher_class} = this.state
        return (
            <div>
                <table className="striped centered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        this.state.UsersData.map(item  => {
                            return(
                                <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><Link to={"/detail-user/"+item.id}>
                                        {item.username}
                                    </Link></td>
                                    <td>
                                        <i className="i-edit  material-icons"
                                            onClick={() => this.toggleUpdate(item.id)}>
                                        edit</i>
                                        <i className="i-delete material-icons"
                                            onClick={() => this.toggleDelete(item.id)}>    
                                        delete</i>
                                    </td>
                                </tr>

                                {this.state.formUpdate == true &&
                                this.state.idUpdate === item.id ? (
                                    <>
                                    <tr>
                                        <td colSpan="3" className="input-field col s3">
                                            <input name="id" 
                                                type="text" 
                                                className="validate"
                                                placeholder={item.id}
                                                value={id}
                                                onChange={this.handleChange}/>
                                            <label for="id">ID</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="input-field col s3">
                                            <input name="username" 
                                                type="text" 
                                                className="validate"
                                                placeholder={item.username}
                                                value={username}
                                                onChange={this.handleChange}/>
                                            <label for="username">Username</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="input-field col s6">
                                            <select className="browser-default"
                                                name="teacher_class"
                                                value={teacher_class}
                                                onChange={this.handleChange}>
                                                    <option disabled selected>Pilih Kelas</option>
                                                    <option name="teacher_class" value="1">1 (Satu)</option>
                                                    <option name="teacher_class" value="2">2 (Dua)</option>
                                                    <option name="teacher_class" value="3">3 (Tiga)</option>
                                                    <option name="teacher_class" value="4">4 (Empat)</option>
                                                    <option name="teacher_class" value="5">5 (Lima)</option>
                                                    <option name="teacher_class" value="6">6 (Enam)</option>
                                            </select>
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
                                ) : null
                                }
                                </>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
