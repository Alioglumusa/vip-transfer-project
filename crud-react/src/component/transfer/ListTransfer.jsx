import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";

export default function ListTransfer() {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transfers");
      setTransfers(response.data.transfers);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const deleteTransfer = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/transfers/${id}`);
      Swal.fire({
        icon: "success",
        text: "Transfer Deleted Successfully!",
      });
      fetchTransfers();
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <span className="display-6 fw-bold">Transfer List</span>
          <Link
            className="btn btn-outline-dark mb-2 float-end"
            to={"/transfers/create"}
          >
            Create Transfer
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Passenger</th>
                    <th>Car</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.length > 0 &&
                    transfers.map((transfer) => (
                      <tr key={transfer.id}>
                        <td>
                          {transfer.passenger
                            ? `${transfer.passenger.first_name} ${transfer.passenger.last_name}`
                            : "N/A"}
                        </td>
                        <td>{transfer.car ? transfer.car.car_name : "N/A"}</td>
                        <td>{transfer.start_location}</td>
                        <td>{transfer.end_location}</td>
                        <td>{transfer.date}</td>
                        <td>{transfer.time}</td>
                        <td>
                          <Link
                            to={`/transfers/edit/${transfer.id}`}
                            className="btn btn-success me-2"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#218838",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteTransfer(transfer.id);
                                }
                              });
                            }}
                          >
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
