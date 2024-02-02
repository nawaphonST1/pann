import './App.css';
import LoginForm from './LoginForm';
import React from 'react';
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
