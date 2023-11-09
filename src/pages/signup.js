import React, { useState } from 'react';
import { toast } from 'react-toastify';
import soko from '../assests/images/soko.png';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CitySelector from '../components/CitySelector';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    
  }

  const regionOptions = ["Nairobi", "Machakos", "Mombasa", "Nakuru", "Kisumu", "Malindi", "Kakamega", "Eldoret",
   "Nyeri", "Muranga", "Nanyuki", "Bomet", "Kitui", "Wote", "Kitale", "Homabay", "Vihiga"];

  const handleLocationChange = (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    setCity('');
  };

  return (
    <>
      <div className="text-center m-4">
        <img src={soko} alt='' style={{ height: "100px" }} />
      </div>
      <div className="container col-m-2 d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: "white", maxWidth: "500px", marginTop: "10px" }}>
        <div className='card'>
          <h5 className='text-center fw-bold'>Welcome to Soko</h5>
          <small className='text-center'>Create your Soko account</small>
          <Form className="d-grid pl-4 m-5" style={{ width: '20em', marginLeft: '0em' }}>
            <Form.Group>
              <div className="d-flex mb-4">
                <div style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label><small>First Name</small></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Label><small>Last Name</small></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    value={lastName}  
                    onChange={(e) => setLastName(e.target.value)}  
                  />
                </div>
              </div>

              <Form.Label><small>Phone Number</small></Form.Label>
              <Form.Control
                type='tel'
                pattern="[0-9]{10}"
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <div className="d-flex mt-3">
                <div style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label><small>Email</small></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Label><small>Password</small></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex mt-4">
                <div style={{ flex: 1, marginRight: '10px' }}>
                <Form.Select style={{ marginBottom: '20px' }} onChange={handleRegionChange} value={region}>
                    <option>Select Region</option>
                    {regionOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </Form.Select>
                </div>
                <div style={{ flex: 1 }}>
                    <CitySelector selectedRegion={region} onCityChange={setCity} />
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" className="mt-3 w-100 mt-5" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading..." : "SIGNUP"}
            </Button>
          </Form>
          <Link to="/login" style={{ color: "black", margin: "auto", marginBottom: "5px" }}>Already have an Account? Login</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
