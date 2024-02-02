import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import axiosConfig from '../axios-interceptor';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axiosConfig.request = null;
        axios.defaults.headers.common = {};
        navigate('/');
    };

    return (
        <Button variant="danger" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
