import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Form } from "react-bootstrap";
import { RawMaterialPackingReport } from "../../utils/APIHelpers";
import { removeUserFromSession } from '../../utils/Common';
import ReactDataTable from "@ashvin27/react-datatable";
import { withRouter } from 'react-router-dom';

class RawPackingMaterialComponent extends Component {

    constructor(props){
        super(props);
    }

    state = {
        selectedCategory: 0,
        selectedDesc : 0,
        data: [],
        flgIsSearched : false,
        category: [],
        description:  [],
        tblColumns: [
            {
                key: "Description",
                text: "Description",
                sortable: true
            },
            {
                key: "Unit",
                text: "Unit",
                sortable: true
            },
            {
                key: "Inventory",
                text: "Total Inventory",
                sortable: true
            }
        ],
        config: {
            page_size: 20,
            length_menu: [10,20,50],
            show_pagination: true,
            button: {
                excel: false,
                print:false
            },
            show_length_menu: false
        }
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
        this.handleGetData();
    }

    handleGetData = () => {
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString(), 'Content-Type': 'application/json' }
            const dataV  = { "CategoryId": this.state.selectedCategory, "ItemId": this.state.selectedDesc }
            axios.post(RawMaterialPackingReport(), dataV ,{headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            data: response.data.items
                        })
                    }else{
                        this.setState({
                            data: []
                        })
                    }
                }
            ).catch((error) => {
                alert('Raw Material & Packing Material Stock Not Found')
            })

        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <h2>Raw Material and Packing Material Stock</h2>
                </Row>
                <Row>
                    <Col xs={6}></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <br/>
                <ReactDataTable 
                     config={this.state.config}
                     records={this.state.data}
                     columns={this.state.tblColumns}
                />
            </div>
        );
    }
}




export default  withRouter(RawPackingMaterialComponent);