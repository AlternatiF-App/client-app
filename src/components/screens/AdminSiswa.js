import React from 'react'
import '../../App.css'
import ListStudents from './ListStudents'
import FormTambah from './FormTambah'

class AdminSiswa extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            inputSiswa : false
        }
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

    render(){
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
                    <ListStudents/>
                </div>
            </div>
        );
    }
}

export default AdminSiswa