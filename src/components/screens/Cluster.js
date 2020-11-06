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
            // console.log('cok',this.state.clustersStudents[index])
            fetch(this.url+"api/try/", {
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
                console.log('cok', result)
                return result
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    componentDidMount(){
        fetch(this.url+"students/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {            
            result.map(item=> {
                this.state.idStudents.push(item.id)
            })
        })
        .catch(err => {
            console.log(err)
        })

        fetch(this.url+"clusters/", {
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
            // console.log('cok cluster',this.state.clustersStudents)
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
                <button onClick={this.onUpdate}>
                    JAJAL COK
                </button>
            </div>
        )
    }
}

export default cluster