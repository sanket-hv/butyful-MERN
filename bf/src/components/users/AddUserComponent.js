import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import NavbarHeader from "../NavbarHeader";
import { removeUserFromSession, getPermission } from '../../utils/Common';
import axios from 'axios';
import { POSTUser } from "../../utils/APIHelpers";
class AddUserComponent extends Component {

    constructor(props){
        super(props);
    }

    state = {
        username: '',
        password: '',
        isAdmin: false,
        itemPermission : false,
        reportPermission : false,
        productionPermission : false,
        userPermission : false
    }

    componentDidMount(){
        document.title = "Users"
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[3].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleAdminChange = (event) => {
        this.setState({
            isAdmin: !this.state.isAdmin
        })
    }

    handlePermission = (event) => {
        var name = event.target.name;
        if(name === "item"){
            this.setState({
                itemPermission: !this.state.itemPermission
            })
        }
        if(name === "itemReport"){
            this.setState({
                reportPermission: !this.state.reportPermission
            })
        }

        if(name === "production"){
            this.setState({
                productionPermission: !this.state.productionPermission
            })
        }

        if(name === "user"){
            this.setState({
                userPermission: !this.state.userPermission
            })
        }
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {"username": this.state.username, "password": this.state.password, "isadmin": this.state.isAdmin, "Permission" : [ { "ModuleId": 1, "flgIsAccess": this.state.itemPermission }, { "ModuleId": 2, "flgIsAccess": this.state.reportPermission }, { "ModuleId": 3, "flgIsAccess": this.state.productionPermission }, { "ModuleId": 4, "flgIsAccess": this.state.userPermission }]};
        console.log(data);
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString(), "Content-Type": "application/json" }
            axios.post(POSTUser(), data, {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        alert('User is saved');
                        this.props.history.push('/users')
                    }else{
                        alert('something went wrong');
                        this.props.history.push('/users')
                    }
                }
            ).catch(error => alert(error));
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }
    handleBack = () => {
        this.props.history.push('/users')
    }

    render() {
        return (
            <div>
                <NavbarHeader/>     
                <br/>
                <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <h3>Add User</h3>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={8}></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Form>
                            <Form.Group controlId="txtUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="txtPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="chkAdmin">
                                <Form.Check 
                                            inline
                                            label = "IsAdmin"
                                            type = "checkbox"
                                            id = "radAdmin"
                                            name="isAdmin"
                                            value= {this.state.isAdmin}
                                            onChange={this.handleAdminChange}
                                        />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <h3>Permission Access</h3>
                                    <br/>
                                    <Form.Group controlId="chkItem">
                                        <Form.Check 
                                                    inline
                                                    label = "Item Access"
                                                    type = "checkbox"
                                                    id = "radItem"
                                                    name="item"
                                                    value= {this.state.itemPermission}
                                                    onChange={this.handlePermission}
                                                />
                                    </Form.Group>

                                    <Form.Group controlId="chkItemReport">
                                        <Form.Check 
                                                    inline
                                                    label = "Item Report"
                                                    type = "checkbox"
                                                    id = "radReport"
                                                    name="itemReport"
                                                    value= {this.state.reportPermission}
                                                    onChange={this.handlePermission}
                                                />
                                    </Form.Group>

                                    <Form.Group controlId="chkProd">
                                    
                                        <Form.Check 
                                                    inline
                                                    label = "Production"
                                                    type = "checkbox"
                                                    id = "production"
                                                    name="production"
                                                    value= {this.state.productionPermission}
                                                    onChange={this.handlePermission}
                                                />
                                    </Form.Group>

                                    <Form.Group controlId="chkuser">
                                        <Form.Check 
                                                    inline
                                                    label = "User"
                                                    type = "checkbox"
                                                    id = "user"
                                                    name="user"
                                                    value= {this.state.userPermission}
                                                    onChange={this.handlePermission}
                                                />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="btns">
                                        <Button variant="primary" type="button" onClick={this.handleSubmit}>
                                            Save
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button variant="danger" type="button" onClick={this.handleBack}>
                                            Back
                                        </Button>
                                </Form.Group>
                        </Form>

                    </Col>
                    <Col></Col>
                </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(AddUserComponent);