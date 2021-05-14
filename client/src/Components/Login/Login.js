
import React, { useContext, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';
import AppContext from '../AppContext/appContext';
import axios from 'axios';
import { LOGIN_URL } from '../../Services/urls.services';

const Login = () => {
    const { userDispatch } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        axios.post(LOGIN_URL, {
            'email': email,
            'password': password
        }).then((response) => {
            console.log("Response", response);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            userDispatch('login');
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <Container style={{ alignItems: 'center', transform: "translate(0px, 20vh)" }}>
            <Form>
                <Row style={{ padding: "5px" }}>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="emailId" placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{ padding: "5px" }}>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{ padding: "5px" }}>
                    <Col sm={{ size: 12, offset: 5 }}>
                        <Button style={{ width: 200, borderRadius: 20 }} onClick={loginUser}>Login</Button>
                    </Col>
                    <Col sm={{ size: 12 }} style={{ textAlign: 'center', padding: 10, color: 'deeppink', fontWeight: 'bold' }}>
                        <a style={{ textDecoration: 'underline' }}>Register New User </a>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;