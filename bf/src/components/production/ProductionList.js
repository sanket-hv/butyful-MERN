import React, { Component } from 'react';
import axios from "axios";
import { GetProduction, POSTTable } from '../../utils/APIHelpers';
import { removeUserFromSession, getPermission } from '../../utils/Common';
import { Row, Col, Container, Button, Table, Form } from "react-bootstrap";
import NavbarHeader from '../NavbarHeader';
import ReactDataTable from "@ashvin27/react-datatable";
import { withRouter } from 'react-router-dom';

class ProductionList extends Component {
    constructor(props){
        super(props);
    }

    state = {
        data: [],
        errorFetch: '',
        tblColumns: [
            {
                key: "ProductionId",
                text: "#",
                sortable: true
            },
            {
                key: "ProductionDate",
                text: "Production Date",
                sortable: true
            },
            {
                key: "TblNo",
                text: "Table No",
                sortable: true
            },
            {
                key: "ProductionTime",
                text: "Production Time",
                sortable: true
            },
            {
                key: "MasterBox",
                text: "MasterBox",
                sortable: true
            },
            {
                key: "ItemCode",
                text: "Item Code",
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
        },
        txtTable : ''
    }

    componentDidMount(){
        document.title = "Production";
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[2].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        if(sessionStorage.getItem('token') !== null){

            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GetProduction(), {headers: authHeaders}).then(
                response => {
                    if(response.data.status){
                        this.setState({
                            data : response.data.production
                        })
                       // console.log(this.state.data)
                    }else{
                        alert('something went wrong');
                    }
                }
            ).catch(error => {
                this.setState({
                    errorFetch: "Production Data Not Found",
                })
            })
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    handleAddProduction = () => {
        this.props.history.push('/add-production'); 
    }

    handleTableValues = (event) => {
        this.setState({
            txtTable : event.target.value
        })
    }

    addTable = (event) => {
        
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            const data = { }
            axios.post(POSTTable(), data, {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            txtTable: ''
                        });
                        alert('Table is added, Table number is ' + response.data.tabelNo);

                    }else{
                        alert('something went wrong');
                    }
                }   
            ).catch((error) => {
                alert(error);
            })
        }else{
            removeUserFromSession();
            this.props.history.push('/login'); 
        }
    }
    render() {
        return (
            <div>
                <NavbarHeader/>
                <br/>
                <div>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={6}></Col>
                            <Col>
                                <Button type="button" variant="primary" onClick={this.addTable}>Add Table</Button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={this.handleAddProduction}>Add</button>
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
        );
    }
}


export default withRouter(ProductionList);