import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditPassenger() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passengerType, setPassengerType] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchPassenger();
  }, []);

  const fetchPassenger = async () => {
    await axios.get(`http://localhost:8000/api/passengers/${id}`)
      .then(({ data }) => {
        const passengerData = data.passenger;
        setFirstName(passengerData.first_name);
        setLastName(passengerData.last_name);
        setPhoneNumber(passengerData.phone_number);
        setPassengerType(passengerData.passenger_type);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const updatePassenger = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      passenger_type: passengerType,
    };

    await axios.put(`http://localhost:8000/api/passengers/${id}`, data)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/passengers");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Passenger</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updatePassenger}>
                  <Row>
                    <Col>
                      <Form.Group controlId="FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="PhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={phoneNumber}
                          onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="PassengerType">
                        <Form.Label>Passenger Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={passengerType}
                          onChange={(event) => setPassengerType(event.target.value)}
                        >
                         <option value="">Select</option>
                         <option value="Patient">Patient</option>
                          <option value="Chauffeur">Chauffeur</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
