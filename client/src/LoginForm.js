import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import axiosConfig from './axios-interceptor';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitEnabled(false);

        try {
            let result = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: username,
                password: password
            });

            // Store the token in localStorage
            localStorage.setItem('jwtToken', result.data.jwt);

            // Set the token in axios configuration
            axiosConfig.jwt = result.data.jwt;
            axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`};

            result = await axios.get('http://localhost:1337/api/users/me?populate=role',{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
              });

            if (result.data.role) {
                if (result.data.role.name === 'Student') {
                    navigate('/student');
                } else if (result.data.role.name === 'Teacher') {
                    navigate('/teacher');
                }
            }
            console.log(result);
        } catch (e) {
            console.log(e);
            console.log('wrong username & password');
            setSubmitEnabled(true);
        }
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!submitEnabled}>
                Submit
            </Button>
        </Form>
    );
};

export default LoginForm;