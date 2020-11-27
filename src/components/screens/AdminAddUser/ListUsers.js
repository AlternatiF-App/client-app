import React, { Component } from 'react'
import "../../../App.css"

export default class ListUsers extends Component {

    constructor(props){
        super(props)

        this.state = ({
            url : 'http://localhost:8000/',
            UsersData : []
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

    render() {
        return (
            <div>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        this.state.UsersData.map(item  => {
                            return(
                                <>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                    </tr>
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
