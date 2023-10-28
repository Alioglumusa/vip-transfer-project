import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListPassengers() {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    await axios.get(`http://localhost:8000/api/passengers`).then(({ data }) => {
      setPassengers(data);
    });
  };

  const deletePassenger = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios.delete(`http://localhost:8000/api/passengers/${id}`).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      fetchPassengers();
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error",
      });
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className='col-12'>
          <Link className='btn btn-primary mb-2 float-end' to={"/passengers/create"}>
            Create Passenger
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Passenger Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    passengers.length > 0 && (
                      passengers.map((passenger, key) => (
                        <tr key={key}>
                          <td>{passenger.first_name}</td>
                          <td>{passenger.last_name}</td>
                          <td>{passenger.phone_number}</td>
                          <td>{passenger.passenger_type}</td>
                          <td>
                            <Link to={`/passengers/edit/${passenger.id}`} className='btn btn-success me-2'>
                              Edit
                            </Link>
                            <Button variant="danger" onClick={() => deletePassenger(passenger.id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
