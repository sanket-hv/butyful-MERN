import React, { Component } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDom from "react-dom";
import {Chart} from 'primereact/chart';
import axios from "axios";
import { GETChart1 } from '../../utils/APIHelpers';
import { removeUserFromSession } from '../../utils/Common';
import { withRouter } from 'react-router-dom';

class HorizontalChart extends Component {

    _isMounted = false;
    constructor(props){
        super(props)
    }
    state = {
        TableNo: [],
        MasterBox: [],
        errorLog: ''
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
        this._isMounted = true;
        if(sessionStorage.getItem('token') !== null){
            const authHeaders = { "Authorization": 'Bearer ' + sessionStorage.getItem('token').toString() }
            axios.get(GETChart1(), {headers: authHeaders}).then(
                (response) => {
                    if(response.data.status){
                        this.setState({
                            TableNo: response.data.TableNo,
                            MasterBox: response.data.MasterBox
                        });
                    }else{
                        this.state.errorLog = "something went wrong";
                    }
                }
            ).catch((error) => {
                this.state.errorLog = error;
            })

        }else{
            removeUserFromSession();
            this.props.history.push('/login');
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }


    render() {
        const data = {
            labels: this.state.TableNo,//['01', '02', '03','04'],
            datasets:[
                {
                    label: 'Master boxed produced',
                    backgroundColor: 'orange',
                    data:  this.state.MasterBox //['100','500','40', '2']
                }
            ]
        }
        return (
            <div>
                <h3>Today's Table wise Production</h3>
                <Chart
                    type='horizontalBar' 
                    data = {data}
                />
            </div>
        );
    }
}





export default withRouter(HorizontalChart);