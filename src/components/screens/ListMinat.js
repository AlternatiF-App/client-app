import React from 'react'

class ListMinat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            minatData : []
        }
    }

    componentDidMount(){
        fetch("http://localhost:8000/api/get-interest/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                minatData : result.results
            }) 
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <>
                <select className="browser-default">
                    <option value="" disabled selected>Pilih Minat</option>
                {
                    this.state.minatData.map(item => {
                        return(
                            <>
                                <option value={item.id}>{item.name}</option>
                            </>
                        )
                    })
                }
                </select>
            </>
        );
    }
}

export default ListMinat