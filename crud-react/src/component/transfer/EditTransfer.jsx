import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

export default function EditTransfer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [carId, setCarId] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [validationError, setValidationError] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    fetchTransfer();
    fetchCars();
    fetchPassengers();
  }, []);

  const fetchTransfer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transfers/${id}`
      );
      const transferData = response.data.transfer;

      setCarId(transferData.car_id);
      setStartLocation(transferData.start_location);
      setEndLocation(transferData.end_location);
      setDate(transferData.date);
      setTime(transferData.time);

      if (transferData.passengers) {
        setSelectedOptions(
          transferData.passengers.map((passenger) => ({
            value: passenger.id,
            label: `${passenger.first_name} ${passenger.last_name}`,
          }))
        );
      }
    } catch (error) {
      Swal.fire({
        text: error.response
          ? error.response.data.message
          : "An error occurred",
        icon: "error",
      });
    }
  };

  const updateTransfer = async (e) => {
    e.preventDefault();

    selectedOptions.forEach((option) => {
      const transferData = {
        passenger_id: option.value,
        car_id: carId,
        start_location: startLocation,
        end_location: endLocation,
        date: date,
        time: time,
      };
      console.log("transferData", transferData);

      axios
        .put(`http://localhost:8000/api/transfers/${id}`, transferData)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
          navigate("/transfers");
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
    });
  };

  const fetchPassengers = async () => {
    await axios.get(`http://localhost:8000/api/passengers`).then(({ data }) => {
      setPassengers(data);
      console.log(data);
    });
  };

  const fetchCars = async () => {
    await axios.get(`http://localhost:8000/api/cars`).then(({ data }) => {
      setCars(data);
    });
  };

  useEffect(() => {
    if (optionList.length === 0) {
      setOptionList(
        passengers.map((el) => ({
          value: el.id,
          label: `${el.first_name} ${el.last_name}`,
        }))
      );
    }
  }, [passengers]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Transfer</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateTransfer}>
                  <Row>
                    <Col>
                      <Form.Group controlId="CarId">
                        <Form.Label>Car</Form.Label>
                        <Form.Control
                          as="select"
                          value={carId}
                          onChange={(event) => setCarId(event.target.value)}
                        >
                          {cars.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.car_name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="PassengerId">
                        <Form.Label>Passengers</Form.Label>
                        <Select
                          options={optionList}
                          placeholder="Select Passengers"
                          value={selectedOptions}
                          onChange={setSelectedOptions}
                          isMulti
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="StartLocation">
                        <Form.Label>Start Location</Form.Label>
                        <Form.Control
                          type="text"
                          value={startLocation}
                          onChange={(event) =>
                            setStartLocation(event.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="EndLocation">
                        <Form.Label>End Location</Form.Label>
                        <Form.Control
                          type="text"
                          value={endLocation}
                          onChange={(event) =>
                            setEndLocation(event.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={time}
                          onChange={(event) => {
                            // Saat değerini alıp "HH:MM" formatına dönüştürme işlemi
                            const selectedTime = event.target.value;
                            setTime(selectedTime);
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
