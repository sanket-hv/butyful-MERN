import React, { Component } from 'react';
import NavbarHeader from "../NavbarHeader";
import axios from 'axios';
import { Row,Col, Container, Card } from "react-bootstrap";
import ProductionTrend from './ProductionTrend';
import HorizontalChart from './HorizontalChart';
import StockReportComponent from './StockReportComponent';
import RawPackingMaterialComponent from './RawPackingMaterialComponent';
import LastProductionComponent from './LastProductionComponent';
import MasterBoxComponent from './MasterBoxComponent';
import { removeUserFromSession } from '../../utils/Common';
import { withRouter } from 'react-router-dom';


class DashboardComponent extends Component {

    _isMounted = false;

    constructor(props){
        super(props);
        if(sessionStorage.getItem('admin') !== null){
            if(sessionStorage.getItem("admin") !== "1"){
                removeUserFromSession();
                this.props.history.push('/login');
            }
        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }
    // componentWillMount(){
    //     document.title = "Dashboard"
    //     if(sessionStorage.getItem("admin") !== null){
    //         if(sessionStorage.getItem("admin") !== 1){
    //             removeUserFromSession();
    //             this.props.history.push('/login');   
    //         }
    //     }else{
    //         removeUserFromSession();
    //         this.props.history.push('/login');
    //     }
    // }
    state = {
        va : ''
    }
    componentDidMount(){
        this._isMounted = true;
        document.title = "Dashboard"
        // if(sessionStorage.getItem("admin") !== null){
        //     if(sessionStorage.getItem("admin") !== 1){
        //         removeUserFromSession();
        //         this.props.history.push('/login');   
        //     }else{

        //     }
        // }else{
        //     removeUserFromSession();
        //     this.props.history.push('/login');
        //}
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render() {
        return (
            <div>
            <NavbarHeader/>
                <br/>
                <Container>
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Last Production Time</Card.Title>
                                <LastProductionComponent />        
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Today's Total MasterBox</Card.Title>
                                <MasterBoxComponent />   
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <StockReportComponent />
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <RawPackingMaterialComponent />
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <HorizontalChart/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <ProductionTrend/>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(DashboardComponent);