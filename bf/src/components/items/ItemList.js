import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import NavbarHeader from '../NavbarHeader';
import { Container, Row, Col, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../../../node_modules/gridjs/dist/theme/mermaid.css"
import { ItemGetAPI } from "../../utils/APIHelpers";
import { removeUserFromSession, getPermission } from "../../utils/Common";
import ReactDataTable from "@ashvin27/react-datatable";



class ItemList extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        data: [],
        errorFetch: '',
        tblColumns: [
            {
                key: "ItemId",
                text: "#",
                sortable: true
            },
            {
                key: "ItemCode",
                text: "Code",
                sortable: true
            },
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
                text: "Inventory",
                sortable: true
            },
            {
                key: "ActualCost",
                text: "ActualCost",
                sortable: true
            },
            {
                key: "TotalValue",
                text: "TotalValue",
                sortable: true
            },
            {
                key: "CategoryName",
                text: "Category",
                sortable: true
            }
        ],
        config: {
            page_size: 10,
            length_menu: [10,20,50],
            show_pagination: true,
            button: {
                excel: false,
                print:false
            }
        }
    }
    handleAddItem = () => {
        this.props.history.push('/add-item'); 
    }
    componentDidMount(){
        document.title = "Items";
        if(sessionStorage.getItem('token') !== null){

            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(ItemGetAPI(), {headers: authHeaders}).then(
                response => {
                    if(response.data.status){
                        this.setState({
                            data : response.data.items
                        })
                       // console.log(this.state.data)
                    }else{
                        
                    }
                }
            ).catch(error => {
                this.setState({
                    errorFetch: "Item not found"
                })
            })
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
        //console.log(tmp[0].flgIsAccess);
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[0].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        
    }
    onRowClickedHandler = (event, data, rowIndex) => {
        console.log(sessionStorage.getItem('admin'));
        if(sessionStorage.getItem('admin') == 1){
            if(data.ItemId){
                this.props.history.push('/edit-item/' + data.ItemId);
            }else{
                alert('something went wrong')
            }
        }
    }
    render(){
        return(
            <div>
                <NavbarHeader/>
                <br/>
                <div>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={8}></Col>
                            <Col>
                                <button className="btn btn-primary" onClick={this.handleAddItem}>Add Item</button>
                            </Col>
                            <Col></Col>
                            <Col xs={12}>
                                <div style={{color:"red"}}>
                                    {this.state.errorFetch ? this.state.errorFetch.toString() : ''}
                                </div>
                                <br/>
                               <ReactDataTable 
                                config={this.state.config}
                                records={this.state.data}
                                columns={this.state.tblColumns}
                                onRowClicked={this.onRowClickedHandler}
                               />
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemList);