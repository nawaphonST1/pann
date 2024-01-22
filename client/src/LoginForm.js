import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import axiosConfig from './axios-interceptor';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()
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
            })
            axiosConfig.jwt = result.data.jwt
            axios.defaults.headers.common = { 'Authorization': `bearer ${axiosConfig}` }

            result = await axios.get('http://localhost:1337/api/users/me?populate=role')
            if(result.data.role){
                if(result.data.role.name == 'Student'){
                    navigate('/student');
                }
                else if(result.data.role.name == 'Teacher'){
                    navigate('/teacher');
                }

            }
            console.log(result)
        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
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

// import { useState } from 'react';
// import { Button, Form, Input, Alert } from 'antd';
// import axios from 'axios'

// const URL_AUTH = "/api/auth/local"

// export default function LoginScreen(props) {

//   const [isLoading, setIsLoading] = useState(false)
//   const [errMsg, setErrMsg] = useState(null)

//   const handleLogin = async (formData) => {
//     try {
//       setIsLoading(true)
//       setErrMsg(null)
//       const response = await axios.post(URL_AUTH, {...formData})
//       const token = response.data.jwt
//       axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
//       props.onLoginSuccess();
//     } catch (err) {
//       console.log(err)
//       setErrMsg(err.message)
//     } finally { setIsLoading(false) }
//   }

//   return (
//     <Form
//       onFinish={handleLogin}
//       autoComplete="off">
//       {errMsg &&
//         <Form.Item>
//           <Alert message={errMsg} type="error" />
//         </Form.Item>
//       }

//       <Form.Item
//         label="Username"
//         name="identifier"
//         rules={[{ required: true, }]}>
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[{ required: true },]}>
//         <Input.Password />
//       </Form.Item>

//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit" loading={isLoading}>
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }