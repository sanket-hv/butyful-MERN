import React, { Component, create } from 'react';
import QRCodeComponent from "./QRCodeComponent";
import { ItemGetAPI } from '../../utils/APIHelpers';
import { removeUserFromSession, getPermission } from '../../utils/Common';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import NavbarHeader from '../NavbarHeader';
import jsPDF from "jspdf";
import { withRouter, Redirect } from 'react-router-dom';
import * as html2canvas from "html2canvas";
var createReactClass = require('create-react-class');
class ReportComponent extends Component {

    constructor(props){
        super(props);
    }

    state = {
        data: [],
        errorFetch: '',
        rows: [],
        flgIsPrint: false,
        htmlData: '',
        tables: [],
        flgIsSelected: false,
        disableButton: false,
    }
    componentDidMount(){
        document.title = "Production Report";
        //console.log(this.state.flgIsPrint);
        let permission = JSON.parse(getPermission());
        let tmp = JSON.parse(permission)
        if(tmp[1].flgIsAccess !== 1){
            removeUserFromSession();
            this.props.history.push('/login');
        }
        if(sessionStorage.getItem('token') !== null){

            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(ItemGetAPI(), {headers: authHeaders}).then(
                response => {
                    if(response.data.status){
                        this.setState({
                            data : response.data.items
                        })
                       //this.handleRows();
                    }else{
                        alert('something went wrong');
                    }
                }
            ).catch(error => {
                this.setState({
                    errorFetch: error
                })
            })
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    // handleRows = () => {
    //     for(let product of this.state.data){
    //         this.state.rows.push(<tr key={product.ItemId}> <td><QRCodeComponent text={{"ItemId": product.ItemId, "Description": product.Description}}></QRCodeComponent></td> <td>Item Code</td> <td>Desc</td>  <td>Unit</td> <td>inventory</td> <td>Actual Cosr</td> <td>Total Value</td> <td>Category</td> </tr>);
    //     }
    // }

    handleCheck = (event) => {
        //console.log(event.target.value);
        //console.log(this.state.rows.find(x => x.ItemId == this.state.data[event.target.value].ItemId));
        if(this.state.rows.find(x => x.ItemId == this.state.data[event.target.value].ItemId) === undefined){
            this.state.rows.push(this.state.data[event.target.value]);
        }else{
            var value = this.state.rows.find(x => x.ItemId == this.state.data[event.target.value].ItemId);
            var indian = this.state.rows.findIndex((element) => {
                return element.ItemId == value.ItemId;
            });
            // console.log(indian);
            if(indian !== -1){
                this.state.rows.splice(indian, 1);
            }

            // console.log(this.state.rows);
        }
        
        //console.log(this.state.rows);

        if(this.state.rows.length > 0){
            this.setState({
                flgIsPrint: false
            })
        }else{
            this.setState({
                flgIsPrint: true
            })
        }
        // console.log(this.state.flgIsPrint);
    }

    handlePrint = (event) => {
        if(this.state.rows.length > 0){
            // console.log(this.state.rows);

            // var doc = new jsPDF('p', 'px', 'a4');

            // let reportCompo = '<table class="table"><tr><td>#</td><td>Item Code</td><td>Description</td><td>Unit</td><td>Inventory</td><td>Actual Cost</td><td>Total Value</td><td>Category</td></tr>';
            // reportCompo = this.state.rows.map((item, index) =>
            //     reportCompo += '<tr key= '+ item.ItemId + '> <td width={"50px"}><QRCodeComponent text= ' + item.ItemId + ',' + item.Description + '></QRCodeComponent></td> <td width="50px">' + item.ItemCode + '</td> <td width="100px">' + item.Description + '</td>  <td width="50px">' + item.Unit + '</td> <td width="50px">' + item.Inventory  + '</td> <td width="50px"> ' + item.ActualCost + '</td> <td width="50px"> ' +  item.TotalValue + '</td> <td width="70px">  ' +  item.CategoryName + '</td> </tr>'
            // );
            // reportCompo += '<tbody> </tbody></table>';
            // var specialElementHandles = {
            //     "#editor": function(element, renderer){
            //         return true;
            //     }
            // }
            // console.log(reportCompo);
            // doc.fromHTML(reportCompo, 15,15,{
            //     "width": 200
            // });
            // doc.save("report-items.pdf");
            this.setState({
                flgIsSelected : true
            });
            //this.state.data = this.state.rows;
            
        }else{
            this.setState({
                flgIsSelected : false
            });
            alert('Please select product to print');
        }

        console.log(this.state.flgIsSelected);
    }

    handleDocument = (event) =>{
        if(this.state.flgIsSelected){
            this.setState({
                disableButton: true
            })
            window.print();
            this.state.rows = []
            window.location.reload();
            //this.props.history.push('/items')
        }else{
            this.setState({
                disableButton: true
            })
            alert('Please select product to print');
        }
        this.setState({
            flgIsSelected:false
        })
    }

    handleClear = () => {
        this.setState({
            flgIsSelected: false,
            flgIsPrint: false,
            rows: []
        })
        window.location.reload();
    }

    render() {
        return (
            <div>
                {/* <QRCodeComponent text="Mitul Sarvaiya" size="100"/>   */}
                <NavbarHeader/>
                <br/>
                
                <div>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={6}></Col>
                            <Col>
                                <Button disabled={this.state.flgIsPrint} onClick={this.handlePrint} type="button" style={this.state.disableButton ? {display: 'hidden'} :{display: ''} }>Select</Button>
                                &nbsp;&nbsp;
                                <Button onClick={this.handleDocument} style={this.state.disableButton ? {display: 'hidden'} :{display: ''} }>Print</Button>
                                &nbsp;&nbsp;
                                <Button onClick={this.handleClear} style={this.state.disableButton ? {display: 'hidden'} :{display: ''} }>Clear</Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col xs={12}>
                            <Table bordered hover striped responsive={"md"} id="tblReport">
                                    <thead>
                                        <tr>
                                            <th>Check?</th>
                                            <th>#</th>
                                            <th>Item Code</th>
                                            <th>Description</th>
                                            <th>Unit</th>
                                            <th>Inventory</th>
                                            <th>Actual Cost</th>
                                            {/* <th>Total Value</th> */}
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            { this.state.flgIsSelected === true ?   this.state.rows.map((item, index) => 
                                                <tr key={item.ItemId}>  <td width="10px"><input type="checkbox" value={index} onChange={this.handleCheck}  /></td> <td width={"50px"}><QRCodeComponent text={item.ItemId +','+item.Description}></QRCodeComponent></td> <td width="50px">{item.ItemCode}</td> <td width="100px">{item.Description}</td>  <td width="50px">{item.Unit}</td> <td width="50px">{item.Inventory}</td> <td width="50px">{item.ActualCost}</td>  <td width="70px"> {item.CategoryName}</td> </tr>
                                            ) : 
                                            this.state.data.map((item, index) => 
                                                <tr key={item.ItemId}>  <td width="10px"><input type="checkbox" value={index} onChange={this.handleCheck} /></td> <td width={"50px"}><QRCodeComponent text={item.ItemId +','+item.Description}></QRCodeComponent></td> <td width="50px">{item.ItemCode}</td> <td width="100px">{item.Description}</td>  <td width="50px">{item.Unit}</td> <td width="50px">{item.Inventory}</td> <td width="50px">{item.ActualCost}</td>  <td width="70px"> {item.CategoryName}</td> </tr>
                                            ) }
                                    </tbody>
                                </Table> 
                            </Col>  
                        </Row>
                    </Container>
                </div>
                
            </div>
        );
    }
}

export default  withRouter(ReportComponent);