import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function ListCar() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    await axios.get(`http://localhost:8000/api/cars`).then(({ data }) => {
      setCars(data);
    });
  };

  const deleteCar = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#218838",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/cars/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchCars();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
        <span className="display-6 fw-bold">Car List</span>
          <Link className="btn btn-outline-dark mb-2 float-end" to={"/cars/create"}>
            Create Car
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Car Name</th>
                    <th>Driver Name</th>
                    <th>Plate Number</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.length > 0 &&
                    cars.map((car, key) => (
                      <tr key={key}>
                        <td>{car.car_name}</td>
                        <td>{car.driver_name}</td>
                        <td>{car.plate_number}</td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>
                          <Link to={`/cars/edit/${car.id}`} className="btn btn-success me-2">
                            Edit
                          </Link>
                          <Button variant="danger" onClick={() => deleteCar(car.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
