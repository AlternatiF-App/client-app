import React from 'react'

class Minat extends React.Component {

    constructor(props){
      super(props)

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
        .then(results => {
            // console.log(result.results)
            this.setState({
              minatData:results.results
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
      return (
        <div className="container">
          <div className="section">
              <div className="row"
                  style={{borderBottom:"1px solid grey"}}>
                  <h3 className="left">Minat</h3>
              </div>
              <table className="striped centered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mata Pelajaran</th>
                    </tr>
                </thead>

                <tbody>
                  {
                    this.state.minatData.map(item => {
                      return(
                        <>
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </table>
          </div>
        </div>
      );
    }
  }
  
  export default Minat;