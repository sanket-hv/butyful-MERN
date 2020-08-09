import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { ItemGetAPI, POSTProduction, GetTables } from '../../utils/APIHelpers';
import { removeUserFromSession, getPermission } from '../../utils/Common';
import NavbarHeader from '../NavbarHeader';
import { Container, Col,Row, Form, Button } from 'react-bootstrap';
import  TextField from "@material-ui/core/TextField";
var dateFormat = require('dateformat');

class AddProduction extends Component {

    constructor(props){
        super(props);

    }

    state = {
        dateSelected: '',
        tableNo: '',
        timeSelected: '',
        masterBoxes: '',
        selectedProduct: '',
        items : [],
        tables: [],
        defaultDate: '',
        defaultTime: ''
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = { "ProductionDate": this.state.dateSelected, "TblId": this.state.tableNo, "ProductionTime": this.state.timeSelected, "MasterBox": this.state.masterBoxes, "ItemId": this.state.selectedProduct  };
        //console.log(data);
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString(), "Content-Type": "application/json" }
            await axios.post(POSTProduction(), data, {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        alert("Production is saved");
                        this.props.history.push('/production');            
                    }else{
                        alert('something went wrong, please try again later');
                        this.props.history.push('/production');            
                    }
                }
            ).catch((error) => {
                console.log(error);
                alert(error);
            })
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
        
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleTableOne = (event) =>{
        this.setState({
            tableNo: event.target.value
        })
    }

    handleTables = (event) => {
        this.setState({
            tableNo: event.target.value
        })
        console.log(this.state.tableNo);
    }

    handleTableTwo = (event) =>{
        this.setState({
            tableNo: event.target.value
        })
    }

    handleTablethree = (event) =>{
        this.setState({
            tableNo: event.target.value
        })
    }

    componentDidMount(){
        document.title = "Add Production";
        var today = new Date()
        this.state.dateSelected =  dateFormat("yyyy-mm-dd");
        this.state.timeSelected = dateFormat('HH:mm');
        //console.log(this.state.timeSelected)
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[2].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        this.handleProduct();
        this.handleGetTables();
        
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleDate = (date) => {
        this.setState({
            dateSelected: date
        })
    }

    handleProduct(){
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(ItemGetAPI(), {headers: authHeaders} ).then(
                (response) => {
                    if(response.data.status === true){
                        this.setState({
                            items: response.data.items
                        });
                    }else{
                        this.setState({
                            tables: []
                        })
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
    
    handleGetTables = () => {
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GetTables(), {headers: authHeaders} ).then(
                (response) => {
                    if(response.data.status === true){
                        this.setState({
                            tables: response.data.tables
                        });
                    }else{
                        this.setState({
                            items: []
                        })
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

    handleBack = () => {
        this.props.history.push('/production');
    }

   

    render() {
        return (
            <div>
                <NavbarHeader></NavbarHeader>
                <br/>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>Add Production</Col>
                        <Col></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <Form>
                                <Form.Group controlId="txtDate">
                                        <Form.Label>Date</Form.Label> &nbsp;&nbsp;&nbsp;
                                        <TextField 
                                            id="date"
                                            type="date"
                                            value={this.state.dateSelected}
                                            defaultValue = {this.state.defaultDate}
                                            name="dateSelected"
                                            style={{width:"500px"}}
                                            onChange={this.handleChange}
                                        />
                                </Form.Group>
                                <Form.Group controlId="radTable">
                                    <Row>
                                        <Col><b>Table No</b></Col>
                                        {
                                            this.state.tables.map((table, index) => 
                                                <Col>
                                                    <Form.Check
                                                        inline
                                                        label = {table.TblNo}
                                                        type="radio"
                                                        id={index}
                                                        name='radTable'
                                                        value = {table.TblId}
                                                        onChange={this.handleTables}
                                                    />
                                                </Col>
                                            )
                                        }
                                        {/* <Col>
                                            <Form.Check 
                                                inline
                                                label = "01"
                                                type = "radio"
                                                id = "chk01"
                                                name="radTable"
                                                value= "1"
                                                onChange={this.handleTables}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Check 
                                                inline
                                                label = "02"
                                                type = "radio"
                                                id = "chk02"
                                                name="radTable"
                                                value= "2"
                                                onChange={this.handleTables}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Check 
                                                inline
                                                label = "03"
                                                type = "radio"
                                                id = "chk03"
                                                name="radTable"
                                                value= "3"
                                                onChange={this.handleTables}
                                            />
                                        </Col> */}
                                    </Row>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId="txtTime">
                                    <Form.Label>Time</Form.Label> &nbsp;&nbsp;&nbsp;
                                    <TextField 
                                        id="time"
                                        type="time"
                                        value={this.state.timeSelected}
                                        name="timeSelected"
                                        defaultValue = {this.state.defaultTime}
                                        style={{width:"500px"}}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            <br/>
                                <Form.Group controlId="txtNumberBoxes">
                                    <Form.Label>No. Of Boxes</Form.Label>
                                    <Form.Control placeholder="No. of Boxes" name="masterBoxes" value={this.state.masterBoxes} onChange={this.handleChange} type="number"/>
                                </Form.Group>
                                <Form.Group controlId="txtItems">
                                    <Form.Label>Items</Form.Label>
                                    <Form.Control 
                                            as="select"
                                            defaultValue="Choose.." name="selectedProduct" value={this.state.Category} onChange={this.handleChange}>
                                                <option value="0">Select Item</option>
                                                {this.state.items.length > 0 ? this.state.items.map((v) => <option value={v.ItemId}>{v.ItemCode}</option>): <option value='0'>Select</option>}
                                        </Form.Control>
                                </Form.Group>
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

export default withRouter(AddProduction);