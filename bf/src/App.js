import React, {useState, useEffect} from 'react';
import Login from './components/LoginComponent';
import Home from './components/HomeComponent';
import AccessDeniedComponent from './components/AccessDeniedComponent';
import {  Route,  BrowserRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import NotFound from "./components/NotFound";
import { getToken, removeUserFromSession, setUserSession, getUser, getPermission } from './utils/Common'
import ItemList from './components/items/ItemList';
import AddEditItemComponent from './components/items/AddEditItemComponent';
import EditItemComponent from "./components/items/EditItemComponent";
import ProductionList from './components/production/ProductionList';
import AddProduction from './components/production/AddProduction';
import ReportComponent from './components/reports/ReportComponent';
import DashboardComponent from './components/dashboard/DashboardComponent';
import { VerifyAPI } from './utils/APIHelpers';
import axios from 'axios';
import PrintReport from './components/reports/PrintReport';
import UserListComponent from './components/users/UserListComponent';
import AddUserComponent from './components/users/AddUserComponent';
import EditUserComponent from './components/users/EditUserComponent';

function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const [flghomePermission, setHomePermission] = useState(true);
  const token = getToken();
  useEffect(() => {
    if (!token) {
      return;
    }
    if(token !== null){
      const authHeaders = { "Authorization": 'Bearer ' + token }
      axios.get( VerifyAPI(), {headers: authHeaders }).then(response => {
        console.log(response.data._token);
        console.log(response.data.isAdmin);
        setUserSession(response.data._token, response.data.Username);
        setAuthLoading(false);
      }).catch(error => {
        removeUserFromSession();
        setAuthLoading(false);
        //this.props.history.push('/login');
      });
    }else{
      removeUserFromSession();
      setAuthLoading(false);
      //this.props.history.push('/login');
    }
    
    // setUserSession(getToken, getUser);
    // setAuthLoading(false);
  },
   []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return(
    
    <div>
      <BrowserRouter>
        <div className="content">
          <PublicRoute exact path="/login" component={Login} flgIsPermission={true}/>
          <PrivateRoute  path="/dashboard" component={DashboardComponent} flgIsPermission={true}/>
          <PrivateRoute  path="/home" component={Home} flgIsPermission={true}/>
          <PrivateRoute  path="/items" component={ItemList} flgIsPermission={true}/>
          <PrivateRoute  path="/add-item" component={AddEditItemComponent} flgIsPermission={true}/>
          <PrivateRoute  path="/edit-item/:id" component={EditItemComponent} flgIsPermission={true}/>

          <PrivateRoute  path="/production" component={ProductionList} flgIsPermission={true}/>
          <PrivateRoute  path="/add-production" component={AddProduction} flgIsPermission={true}/>

          <PrivateRoute  path="/item-report" component={ReportComponent} flgIsPermission={true}/>
          <PrivateRoute  path="/print-report" component={PrintReport} flgIsPermission={true}/>

          
          <PrivateRoute  path="/users" component={UserListComponent} flgIsPermission={true}/>
          <PrivateRoute  path="/add-user" component={AddUserComponent} flgIsPermission={true}/>
          <PrivateRoute  path="/edit-user/:id" component={EditUserComponent} flgIsPermission={true}/>

          <PrivateRoute exact path="/" component={Home} flgIsPermission={true}/>
          <Route path="/access-denied" exact component={AccessDeniedComponent} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
