import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';
import React from 'react';
import Eventform from './component/event';
import { useState } from 'react';

function App() {
  const clickMe = () => console.log('hello world')
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div class="container">
      <LoginForm setAuthenticated={setAuthenticated} />
    </div>
  );
}

export default App;
