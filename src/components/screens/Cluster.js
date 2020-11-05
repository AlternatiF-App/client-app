import React, { Component } from 'react'

class cluster extends Component {

    url = "http://localhost:8000/"
    constructor(props){
        super(props)

        this.state  = {
            idStudents : [],
            clustersStudents : []
        }
    }
    onUpdate(){
        // var formData = new FormData();
        // // i = [{1},{2},{3}]
        // this.state.idStudents.map(i => {
        //     formData.append("id", i)
        //     // console.log('cok', i)
        // })
        // this.state.clustersStudents.map(i => {
        //     formData.append("cluster", i)
        // })
        var data1 = [
            JSON.stringify(this.state.idStudents),
            JSON.stringify(this.state.clustersStudents)
        ]
        var data2 = {}
        // this.state.idStudents.map(i => {
        //     data2 = i
        // })
        console.log('cok', data1)
        // var a = ''
        // for(a of formData){
        //     console.log(a, 'cok')
        // }
        // console.log("COKER", formData)
        // return fetch(this.url+"api/try/", {
        //     method:"PUT",
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Content-Type":"application/x-www-form-urlencoded"
        //     },
        //     body:formData
        // })
        // .then(res => res.json())
        // .then(resultecuk => {
        //     console.log("COKER", resultecuk)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
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
                this.setState(prevState=>({
                    idStudents:[...prevState.idStudents, item.id]
                    // idStudents: this.state.idStudents.concat([item.id])
                    // idStudents: [...this.state.idStudents, item.id]
                }))
                // this.state.idStudents.push(item.id)
            })
            
            console.log("COK SISWA",  this.state.idStudents)
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
            
            console.log("COK CLUSTER",this.state.clustersStudents)
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
                <button onClick={()=>this.onUpdate()}>
                    JAJAL COK
                </button>
            </div>
        )
    }
}

export default cluster