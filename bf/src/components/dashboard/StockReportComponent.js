import React, { Component } from 'react';
import { removeUserFromSession } from '../../utils/Common';
import { FGStockReport } from '../../utils/APIHelpers';
import ReactDataTable from "@ashvin27/react-datatable";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { withRouter } from 'react-router-dom';
class StockReportComponent extends Component {

    constructor(props){
        super(props);
    }

    state ={
        data : [],
        total: 0,
        tblColumns: [
            {
                key: "Description",
                text: "FG Item Name",
                sortable: true
            },
            {
                key: "MasterBox",
                text: "Total Inventory Master Box",
                sortable: true
            },
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
        this.handleStockReport();
    }

    handleStockReport = () => {
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(FGStockReport(), {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            data: response.data.StockReport
                        })

                        this.state.data.map((item ,index) => {
                            if(item.MasterBox === 0){
                                item.MasterBox = "0"
                            }
                        });

                        let total = 0;
                        response.data.StockReport.map((item, index) => {
                            total += parseInt(item.MasterBox);
                        });
                        this.setState({
                            total: total
                        })

                    }else{
                        this.state.errorLog = "something went wrong";
                    }
                }
            ).catch((error) => {
                alert('FG Stock Report Not Found')
            })

        }else{
            removeUserFromSession()
            this.props.history.push('/login');
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <h2>FG Stock Report</h2>
                </Row>
                <Row>
                    <Col>
                    <ReactDataTable
                     config={this.state.config}
                     records={this.state.data}
                     columns={this.state.tblColumns}
                    />
                    </Col>
                    <Col>
                    {/* <h2><b>Total Inventory Master Boxes <font color="red">{this.state.total}</font></b></h2>     */}
                </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(StockReportComponent);