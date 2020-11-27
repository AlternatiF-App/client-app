import React, { Component } from 'react'
import ListUsers from './ListUsers'
import AddUsers from './AddUser'
import "../../../App.css"

export default class Users extends Component {

    constructor(props){
        super(props)

        this.state = {
            FormInput : false
        }
    }

    toggleInput(){
        if (this.state.FormInput === true) {
            this.setState({
                FormInput: false
            });
        } else {
            this.setState({
                FormInput: true
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row"
                        style={{borderBottom:"1px solid grey"}}>
                        <h3 className="left">Users</h3>
                        <i onClick={() => this.toggleInput()}
                            className="i-plus medium right material-icons">add_circle
                        </i>
                        <div>
                            {this.state.FormInput === true ? (
                                <div>
                                    <AddUsers/>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <ListUsers/>
                </div>
            </div>
        )
    }
}
