import React, { Component } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDom from "react-dom";
import {Chart} from 'primereact/chart';
import axios from "axios";
import { removeUserFromSession } from '../../utils/Common';
import { withRouter } from 'react-router-dom';
import { GETChart2, GetTables, ProductionTrendByTable } from '../../utils/APIHelpers';
import { Alert, Row, Col, Form } from 'react-bootstrap';


class ProductionTrend extends Component {

    _isMounted = false;

    constructor(props){
        super(props);
    }

    state = {
        labels: [],
        errorLog: '',
        datasets: [],
        tables: [],
        selectedTable: "0"
    }

    handleTableChange = (event) => {
        this.setState({
            selectedTable: event.target.value
        })
    }
    handleGetTables = () => {
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GetTables(), {headers : authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            tables: response.data.tables
                        });
                    }else{
                        this.setState({
                            errorLog: "Table data not found for " + this.state.selectedTable
                        })
                        this.handleProductionTrend();
                    }
                }
            ).catch(error => alert("Table data not found"));
        }else{
            removeUserFromSession()
            this.props.history.push('/login');
        }
    }

    componentDidMount(){
        this._isMounted = true;
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
        this.handleGetTables()
        this.handleProductionTrend();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleProductionTrend(){
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GETChart2(), {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.state.labels = response.data.date;
                        let Values = []
                        response.data.Data.map((items, index) => {
                            Values.push({
                                type: 'bar',
                                label: items.tables,
                                backgroundColor: '#66BB50',
                                data: items.tableArray
                            })
                        });
                        //console.log(JSON.stringify(Values));
                        this.setState({
                            datasets: Values
                        })
                    }else{
                        this.setState({
                            errorLog : "something went wrong"
                        })
                    }
                }
            ).catch((error) => {
                this.setState({
                    errorLog : "Production Trend Not Found"
                })
            })

        }else{
            removeUserFromSession()
            this.props.history.push('/login');
        }
    }
    
    
    handleFilter = () => {
        console.log(this.state.selectedTable);
        if(parseInt(this.state.selectedTable) > 0){
            if(sessionStorage.getItem('token') !== null){
                const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
                axios.get(ProductionTrendByTable(parseInt(this.state.selectedTable)), {headers: authHeaders}).then(
                    (response) => {
                        if(response.data.status){
                            this.state.labels = response.data.date;
                            let Values = []
                            response.data.Data.map((items, index) => {
                                Values.push({
                                    type: 'bar',
                                    label: items.tables,
                                    backgroundColor: '#66BB50',
                                    data: items.tableArray
                                })
                            });
                            //console.log(JSON.stringify(Values));
                            this.setState({
                                datasets: Values
                            })
                        }else{
                            let Values = []
                            Values.push({
                                type: 'bar',
                                label: [0],
                                backgroundColor: '#66BB50',
                                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                            })
                            this.setState({
                                datasets: Values
                            })
                            this.setState({
                                errorLog : "something went wrong"
                            })
                        }
                    }
                ).catch((error) => {
                    let Values = []
                    Values.push({
                        type: 'bar',
                        label: [0],
                        backgroundColor: '#66BB50',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    })
                    this.setState({
                        datasets: Values
                    })
                    this.setState({
                        errorLog : error
                    })
                })
    
            }else{
                removeUserFromSession()
                this.props.history.push('/login');
            }
        }else{
            if(sessionStorage.getItem('token') !== null){
                const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
                axios.get(GETChart2(), {headers: authHeaders}).then(
                    (response) => {
                        if(response.data.status){
                            this.state.labels = response.data.date;
                            let Values = []
                            response.data.Data.map((items, index) => {
                                Values.push({
                                    type: 'bar',
                                    label: items.tables,
                                    backgroundColor: '#66BB50',
                                    data: items.tableArray
                                })
                            });
                            //console.log(JSON.stringify(Values));
                            this.setState({
                                datasets: Values
                            })
                        }else{
                            let Values = []
                            Values.push({
                                type: 'bar',
                                label: [0],
                                backgroundColor: '#66BB50',
                                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                            })
                            this.setState({
                                datasets: Values
                            })
                            this.setState({
                                errorLog : "something went wrong"
                            })
                        }
                    }
                ).catch((error) => {

                    let Values = []
                    Values.push({
                        type: 'bar',
                        label: [0],
                        backgroundColor: '#66BB50',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    })
                    this.setState({
                        datasets: Values
                    })
                    this.setState({
                        errorLog : error
                    })
                })
    
            }else{
                removeUserFromSession()
                this.props.history.push('/login');
            }
        }
    }
    handleClear = () =>{
        this.setState({
            selectedTable : "0"
        })
        this.handleProductionTrend();
    }

    render() {
        const stackedData = {
            labels: this.state.labels,// ["10-Jul-2020", "11-Jul-2020", "12-Jul-2020", "13-Jul-2020", "14-Jul-2020", "15-Jul-2020", "16-Jul-2020", "17-Jul-2020", "18-Jul-2020"],
             datasets: this.state.datasets//[
            //     {
            //         type: 'bar',
            //         label: "01",
            //         backgroundColor: '#66BB6A',
            //         data: [
            //             10,
            //             200,
            //             0,
            //             400,
            //             500,
            //             900,
            //             80,
            //             1,
            //             10
            //         ]
            //     },
            //     {
            //         type: 'bar',
            //         label: "02",
            //         backgroundColor: '#FFCA28',
            //         data: [
            //             5,
            //             20,
            //             100,
            //             40,
            //             550,
            //             970,
            //             81,
            //             150,
            //             107
            //         ]
            //     },
            //     {
            //         type: 'bar',
            //         label: "03",
            //         backgroundColor: '#42A5F5',
            //         data: [
            //             41,
            //             52,
            //             24,
            //             40,
            //             54,
            //             98,
            //             10,
            //             15,
            //             10
            //         ]
            //     },
            // ]
        };
        const stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };
        return (
            <div>
                <h3>Production Trend</h3>
                <Row>
                    <Col xs={2}> 
                    <Form.Control 
                        as="select"
                        defaultValue="Choose Table" name="selectedTable" value={this.state.selectedTable} onChange={this.handleTableChange}>
                            <option value="0">Select Table</option>
                            {this.state.tables.length > 0 ? this.state.tables.map((v) => <option value={v.TblId}>{v.TblNo}</option>): <option value='0'> </option>}
                    </Form.Control>
                    </Col>
                    <Col xs={2}>
                        <button onClick={this.handleFilter} class="btn btn-primary">Filter</button>
                        &nbsp;&nbsp;
                        <button onClick={this.handleClear} class="btn btn-danger">Clear</button>
                    </Col>
                    <Col>
                            
                    </Col>
                </Row>
                <Chart type='bar' data={stackedData} options={stackedOptions} />                
            </div>
        );
    }
}

export default  withRouter(ProductionTrend);