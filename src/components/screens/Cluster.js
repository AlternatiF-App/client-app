import React, { Component } from 'react'

class cluster extends Component {

    url = "http://localhost:8000/"
    constructor(props){
        super(props)

        this.state  = {
            idStudents : [],
            clustersStudents : []
        }

        this.onUpdate  = this.onUpdate.bind(this)
    }
    
    onUpdate = () => {
        this.state.idStudents.map((item,index=0) => {
            fetch(this.url+"api/update-clusters/", {
                method:"PUT",
                headers:{
                    'Accept': 'application/json, text/plain',
                    "Content-Type":"application/json"
                },
                body:JSON.stringify([{        
                    'id':item,
                    'cluster':this.state.clustersStudents[index]
                }])
            })
            .then(res => res.json())
            .then(result => {
                return result
                .then(window.location.reload())
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    componentDidMount(){
        fetch(this.url+"api/students/", {
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("access token"),
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {            
            result.results.map(item=> {
                this.state.idStudents.push(item.id)
            })
        })
        .catch(err => {
            console.log(err)
        })

        fetch(this.url+"api/clusters/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {            
            result.clusters.map((i, item) => {
                if(i[item] != ''){
                    this.state.clustersStudents.push(i)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    UNSAFE_componentWillMount(){
        return true
    }

    render() {
        return (
            <div>
                <button className="btn-update-cluster"
                    onClick={this.onUpdate}>
                    Update Cluster
                </button>
            </div>
        )
    }
}

export default cluster