import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavbarHeader from "../NavbarHeader";
import axios from "axios";
import { CategoryGetAPI, PostItemAPI, GetSingleItem } from '../../utils/APIHelpers'
import {removeUserFromSession, getPermission} from '../../utils/Common'

class AddEditItemComponent extends React.Component{
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
        itemId: 0

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
    handleRadioPcs = (event) => {
        this.setState({
            unit: event.target.value
        })
    }

    handleRadioKG = (event) => {
        this.setState({
            unit: event.target.value
        })
    }

    handleRadioOther = (event) => {
        this.setState({
            unit: event.target.value
        })
    }

    componentDidMount(){
        document.title = "Add Item";
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[0].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        this.handleCategory()

        
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

    handleBack = (event) => {
        event.preventDefault();
        this.props.history.push('/items');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //console.dir(this.state);
        let arrayOferrors  = []
        if(this.state.ItemName === ''){
            arrayOferrors.push('Please enter item name');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.Description === ''){
            arrayOferrors.push('Please enter description');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.unit === ''){
            arrayOferrors.push('Please select value');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.ActualCost === ''){
            arrayOferrors.push('Please enter actual cost');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.Inventory === ''){
            arrayOferrors.push('Please enter inventory item');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.Value === ''){
            arrayOferrors.push('Please enter value');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        if(this.state.Category === '' && this.state.category > 0){
            arrayOferrors.push('Please select category');
            this.setState({
                flgErrors: true
            });
        }else{
            this.setState({
                flgErrors: false
            });
        }
        this.state.errorList = arrayOferrors;
        //console.log(this.state.errorList)
        if(this.state.errorList.length > 0){
            this.setState({
                flgErrors: true
            })
        }else{
            this.setState({
                flgErrors: false
            });
            if(sessionStorage.getItem('token') !== null){
                const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString(), "Content-Type": "application/json" }
                const data = { "ItemCode": this.state.ItemName, "Description": this.state.Description, "Unit": this.state.unit, "Inventory": this.state.Inventory, "ActualCost": this.state.ActualCost, "TotalValue": this.state.Value, "CategoryId": this.state.Category };
                //console.log(data);
                axios.post(PostItemAPI(), data, {headers: authHeaders}).then(
                    (response) => {
                        if(response.data.status){
                            alert('Your item is saved');
                            this.props.history.push('/items');            
                        }else{
                            alert('something went wrong')
                        }
                    }
                ).catch((error) => {alert(error); })
            }else{
                removeUserFromSession();
                this.props.history.push('/login');
            }
        }


    }

    render(){
        return(
            <div>
                <NavbarHeader />
                <br/>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <h3>Add Item</h3>
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
                                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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

export default withRouter(AddEditItemComponent);