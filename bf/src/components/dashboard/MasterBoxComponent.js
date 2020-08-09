import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Form } from "react-bootstrap";
import { RawMaterialPackingReport, GETMasterbox } from "../../utils/APIHelpers";
import { removeUserFromSession } from '../../utils/Common';
import { withRouter } from 'react-router-dom';
    
class MasterBoxComponent extends Component {

    constructor(props){
        super(props)
    }

    state = {
        TotalMasterBox : ''
    }

    componentDidMount(){
        // if(sessionStorage.getItem("admin") !== null){
        //     if(sessionStorage.getItem("admin") !== 1){
        //         removeUserFromSession();
        //         this.props.history.push('/login');   
        //     }else{

        //     }
        // }else{
        //     removeUserFromSession();
        //     this.props.history.push('/login');
        // }
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString(), 'Content-Type': 'application/json' }
            axios.get(GETMasterbox() ,{headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            TotalMasterBox: response.data.MasterBox
                        })
                    }else{
                        this.setState({
                            TotalMasterBox: 0
                        })
                    }
                }
            ).catch((error) => {
                alert('something went wrong')
            })

        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }
    render() {
        return (
            <div>
                <h2><font color="red">{this.state.TotalMasterBox}</font></h2>
            </div>
        );
    }
}

export default withRouter(MasterBoxComponent);