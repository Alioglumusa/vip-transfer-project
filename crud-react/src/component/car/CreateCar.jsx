import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateCar() {
  const navigate = useNavigate();

  const [carName, setCarName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [validationError, setValidationError] = useState({});

  const createCar = async (e) => {
    e.preventDefault();

    const carData = {
      car_name: carName,
      driver_name: driverName,
      plate_number: plateNumber,
      brand: brand,
      model: model,
    };

    await axios
      .post(`http://localhost:8000/api/cars`, carData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/cars");
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
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Car</h4>
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
                <Form onSubmit={createCar}>
                  <Row>
                    <Col>
                      <Form.Group controlId="CarName">
                        <Form.Label>Car Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={carName}
                          onChange={(event) => {
                            setCarName(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="DriverName">
                        <Form.Label>Driver Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={driverName}
                          onChange={(event) => {
                            setDriverName(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="PlateNumber">
                        <Form.Label>Plate Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={plateNumber}
                          onChange={(event) => {
                            setPlateNumber(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type="text"
                          value={brand}
                          onChange={(event) => {
                            setBrand(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                          type="text"
                          value={model}
                          onChange={(event) => {
                            setModel(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Save
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
