import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { removeUserFromSession, getUser, getPermission } from '../../utils/Common';
import { GETUser } from '../../utils/APIHelpers';
import { Row, Col, Container, Button, Table, Form } from "react-bootstrap";
import NavbarHeader from '../NavbarHeader';
import ReactDataTable from "@ashvin27/react-datatable";

class UserListComponent extends Component {

    constructor(props){
        super(props);

    }
    state = {
        data: [],
        errorFetch : '',
        tblColumns : [
            {
                key: 'UserId',
                text: '#',
                sortable: true
            },
            {
                key: 'Username',
                text: 'Username',
                sortable: true
            }
            // },
            // {
            //     key: 'isAdmin',
            //     text: 'IsAdmin',
            //     sortable: true
            // }
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

    componentDidMount(){
        document.title = "Users";
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[3].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GETUser(), {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            data: response.data.users
                        });

                        this.state.data.map((item, index) => {
                            item.isAdmin === 1 ? item.isAdmin = true : item.isAdmin = false
                        });
                        // console.log(this.state.data);
                    }else{
                        alert('something went wrong');          
                    }
                }
            ).catch(error => alert(error))
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    handleRowClick = (event, data, rowIndex) => {
        if(sessionStorage.getItem('admin') == 1){
            if(data.UserId){
                this.props.history.push('/edit-user/' + data.UserId);
            }else{
                alert('something went wrong')
            }
        }
    }

    handleAddUser = () => 
    {
        this.props.history.push('/add-user'); 
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
                            <Col xs={8}></Col>
                            <Col><button className="btn btn-primary" onClick={this.handleAddUser}>Add</button></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col></Col>
                            <Col xs={12}>
                                <ReactDataTable
                                    config={this.state.config}
                                    records={this.state.data}
                                    columns={this.state.tblColumns}
                                    onRowClicked={this.handleRowClick}
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

export default withRouter(UserListComponent);