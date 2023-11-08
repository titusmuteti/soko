import React, { useState } from 'react';
import { toast } from 'react-toastify';
import soko from '../assests/images/soko.png';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    setIsLoading(true); 

    fetch('https://sokoapi.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        console.log(response);
        setIsLoading(false); 

        if (response.ok) {
          toast.success('Login successful');
          window.location.href = '/payment';
        } else {
          response.json().then((error) => setErrors(error.errors));
          toast.warning('Wrong email or password');
        }
      });
  }

  return (
    <>
      <div className="text-center m-4">
        <img src={soko} alt='' style={{ height: "100px" }} />
      </div>
      <div className="container col-m-2 d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: "white", maxWidth: "500px", marginTop: "10px" }}>
        <div className='card'>
          <h5 className='text-center fw-bold'>Welcome to Soko</h5>
          <small className='text-center'>Type your e-mail to log in to your Soko account</small>
          <Form className="d-grid pl-4 m-5" style={{ width: '20em', marginLeft: '0em' }}>
            <Form.Group>
              <Form.Label><small>Email</small></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Label className='mt-4'><small>Password</small></Form.Label>
              <Form.Control
                type='password' 
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3 w-100 mt-5" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
