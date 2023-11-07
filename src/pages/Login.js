import React from 'react';
import Form from 'react-bootstrap/Form';
import soko from '../assests/images/soko.png';
import { Button } from 'react-bootstrap';


function Login () {
    return(
        <>               
        <div className="text-center m-4">
            <img src={soko} alt='' style={{ height: "100px" }} />
        </div>
        <div className="container col-m-2 d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: "white", maxWidth: "500px", marginTop: "10px" }}>
            <div className='card'>
                <h5 className='text-center fw-bold'>Welcome to Soko</h5>
                <small className='text-center'>Type your e-mail to login into your Soko account</small>
                <Form className="d-grid pl-4 m-5" style={{ width: '20em', marginLeft: '0em' }}>
                    <Form.Group>
                        <Form.Label>Enter email or phone number</Form.Label>
                        <Form.Control type='text' placeholder='Enter number' />

                        <Button variant="primary" className="mt-3 w-100 mt-5">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
        </>
    )
}

export default Login