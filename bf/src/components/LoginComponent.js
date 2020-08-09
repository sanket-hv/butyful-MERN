import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Jumbotron, Card  } from "react-bootstrap";
import { setUserSession, setPermission } from '../utils/Common'
import { LoginAPI } from '../utils/APIHelpers';
import axios from "axios";

function Login(props){

    const useFormInput = initialValue =>{
        const[value, setValue] = useState(initialValue);
        
        const handleChange = e =>{
            setValue(e.target.value);
        }
        return{
            value,
            onChange: handleChange
        }
    }
    document.title = "Login";
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        if(username.value === "" && password.value === ""){
            setLoading(false);
            setError("Username or password is not empty");
        }else{
            const userData = { username: username.value, password: password.value };
            axios.post(LoginAPI(), userData, {headers: { 'Content-Type': 'application/json' }}).then(
                response =>  {
                    if(response.data.status){
                        setLoading(false);
                        setUserSession(response.data._token, response.data.Username);
                        setPermission(response.data.Permission);
                        sessionStorage.setItem('admin', response.data.isAdmin);
                        if(response.data.isAdmin){
                            props.history.push('/dashboard');
                        }else{
                            props.history.push('/home');
                        }
                        
                    }else{
                        setLoading(false);
                        setError(response.data.message);        
                    }
                }
            ).catch( (error) => {
                setLoading(false);
                // console.log(error);
                // setError("Sorry, username or password is wrong.");
                setError(error.toString());
            })
        }
        
    }

    return(
        <div>
            <Container>
                    
                    <Row style={{marginTop:"50px"}}>
                        <Col></Col>
                        <Col xs={10}>
                            {/* <Jumbotron>
                                <h1>Login</h1>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" name="email"  id="email" {...username} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" id="password" {...password}/>
                                    </Form.Group>
                                    <Button variant="primary" type="buttton"  onClick={handleLogin} disabled={loading}>
                                        {loading ? 'Loading...' : 'Login'}
                                    </Button>
                            </Jumbotron> */}
                            <Card style={{width:'auto'}}>
                                <Card.Body>
                                    <Card.Title>Login</Card.Title>
                                    <br/>
                                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" name="email"  id="email" {...username} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" id="password" {...password}/>
                                    </Form.Group>
                                    <Button variant="primary" type="buttton"  onClick={handleLogin} disabled={loading}>
                                        {loading ? 'Loading...' : 'Login'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                    </Container>
        </div>

    );

    
}

export default Login;