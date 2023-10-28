import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Header = () => {
  return (
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          <span>Home</span>
        </Link>
        <Link to={"/passengers"} className="navbar-brand text-white">
          <span>Passengers</span>
        </Link>
        <Link to={"/cars"} className="navbar-brand text-white">
          <span>Cars</span>
        </Link>
        <Link to={"/transfers"} className="navbar-brand text-white">
          <span>Transfers</span>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
