import React from 'react'
import axios from "axios";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { GetSingleItem, CategoryGetAPI, PUTItem } from '../../utils/APIHelpers';
import { render } from '@testing-library/react';
import NavbarHeader from '../NavbarHeader';
import { removeUserFromSession, getPermission } from '../../utils/Common';

class EditItemComponent extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        ItemName: '',
        Description: '',
        unit: '',
        Inventory: '0',
        ActualCost: '0',
        Value : '0',
        Category: '',
        flgErrors : false,
        errorList : [],
        varient: 'error',
        category: [],
        itemId: parseInt(this.props.match.params.id)
    }
    handleChange = (event) =>{
        
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleCalculate = () => {
        let ValueToBeCalculated = parseInt(this.state.Inventory) * parseInt(this.state.ActualCost);
        this.setState({
            Value : ValueToBeCalculated > 0 ? ValueToBeCalculated : 0
        });
    }

    componentDidMount(){
        document.title = "Edit Item";
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[0].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        this.handleCategory();
        this.handleData()

        console.log(this.state);
    }

    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push('/items');
    }

    handleCategory = () => {
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(CategoryGetAPI(), {headers: authHeaders} ).then(
                (response) => {
                    if(response.data.status === true){
                        this.setState({
                            category: response.data.categorys
                        });
                    }else{
                        this.setState({
                            category: []
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

    handleData = async () => {
        if(this.props.match.params.id > 0){
            if(sessionStorage.getItem('token').toString() === null){
                removeUserFromSession()
            this.props.history.push('/login');
            }else{
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            await axios.get(GetSingleItem(this.props.match.params.id), {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            ItemName : response.data.items[0].ItemCode,
                            Description: response.data.items[0].Description,
                            unit: response.data.items[0].Unit,
                            Inventory: response.data.items[0].Inventory,
                            ActualCost: response.data.items[0].ActualCost,
                            Value: response.data.items[0].TotalValue,
                            Category: response.data.items[0].CategoryId,
                        });
                    }else{
                        alert('something went wrong')
                    }
                }
            ).catch((error) => {
                alert(error);
            })
            }
        }
    }

    handleUpdate = async () => {
        if(this.props.match.params.id > 0){
            if(sessionStorage.getItem('token').toString() === null){
                alert('something went wrong');
                removeUserFromSession();
                this.props.history.push('/login');  
            }else{
                const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
                const data = { "ItemCode": this.state.ItemName, "Description": this.state.Description, "Unit": this.state.unit, "Inventory": this.state.Inventory, "ActualCost": this.state.ActualCost, "TotalValue": this.state.Value, "CategoryId": this.state.Category, "ItemId": this.props.match.params.id };
                await axios.post(PUTItem(), data, {headers: authHeaders}).then(
                    (response) => {
                        if(response.data.status){
                            alert('item is updated');
                            this.props.history.push('/items');
                        }else{
                            alert('something went wrong, please try again later');
                            this.props.history.push('/items');
                        }
                    }
                ).catch((error) => {
                    alert(error);
                })
            }
        }else{
            this.props.history.push('/');
        }
    }
    render(){
        return(
            <div>
                <NavbarHeader></NavbarHeader>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <h3>Edit Item</h3>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            {this.state.flgErrors ?  this.state.errorList.map((item) => <Alert variant={this.state.varient}>{item}</Alert>)  : ''}
                        </Col>
                        <Col></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                        <Form>
                                <Form.Group controlId="txtItem">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control placeholder="Item #" name="ItemName" value={this.state.ItemName} onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="txtDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control placeholder="Description" name="Description" value={this.state.Description} onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="radPcs">
                                <Row>
                                    <Col><b>Unit</b></Col>
                                    <Col>
                                        <Form.Check 
                                            inline
                                            label = "PCS"
                                            type = "radio"
                                            id = "chkPcs"
                                            name="unit"
                                            value= "PCS"
                                            onChange={this.handleRadioPcs}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            inline
                                            label = "KG"
                                            type = "radio"
                                            id = "chkKg"
                                            name="unit"
                                            value= "KG"
                                            onChange={this.handleRadioKG}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            inline
                                            label = "Other"
                                            type = "radio"
                                            id = "chkOther"
                                            name="unit"
                                            value= "Other"
                                            onChange={this.handleRadioOther}
                                        />
                                    </Col>
                                </Row>
                                </Form.Group>
                                <Form.Group controlId="txtInventory">
                                    <Form.Label>Inventory</Form.Label>
                                    <Form.Control placeholder="Inventory" name="Inventory" value={this.state.Inventory} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="txtActualCost">
                                    <Form.Label>Actual Cost</Form.Label>
                                    <Form.Control placeholder="Actual Cost" name="ActualCost" value={this.state.ActualCost} onChange={this.handleChange} onBlur={this.handleCalculate}/>
                                </Form.Group>

                                <Form.Group controlId="txtValue">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control placeholder="Value" name="Value" value={this.state.Value} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="txtCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control 
                                            as="select"
                                            defaultValue="Choose.." name="Category" value={this.state.Category} onChange={this.handleChange}>
                                                <option value="0">Select Category</option>
                                                {this.state.category.length > 0 ? this.state.category.map((v) => <option value={v.CategoryId}>{v.CategoryName}</option>): <option value='0'>Select</option>}
                                        </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="btns">
                                        <Button variant="primary" type="button" onClick={this.handleUpdate}>
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

export default withRouter(EditItemComponent);