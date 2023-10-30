import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../../img/logo.webp";

const Header = () => {
  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Link to={"/"} className="navbar-brand">
          <img src={Logo} className="d-inline-block align-top" alt="Logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/Transfers"} className="nav-link text-white">
                Transfers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/passengers"} className="nav-link text-white">
                Passengers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cars"} className="nav-link text-white">
                Cars
              </Link>
            </li>
          </ul>

          <div className="d-flex">

            <Link to={"/passengers/create"} className="text-white me-2">
              <Button variant="light">➕Create Passengers</Button>
            </Link>
            <Link to={"/cars/create"} className="text-white me-2">
              <Button variant="light">🚑Create Cars</Button>
            </Link>
            <Link to={"/transfers/create"} className="text-white">
              <Button variant="light">🚩Create Transfers</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
