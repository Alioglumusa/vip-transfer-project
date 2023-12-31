import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./component/Header & Footer/Header";
import Footer from "./component/Header & Footer/Footer"

import EditProduct from "./component/product/edit.component";
import ProductList from "./component/product/list.component";
import CreateProduct from "./component/product/create.component";

import EditPassenger from "./component/passenger/EditPassenger";
import ListPassenger from "./component/passenger/ListPassenger";
import CreatePassenger from "./component/passenger/CreatePassenger";

import EditCar from "./component/car/EditCar";
import ListCar from "./component/car/ListCar";
import CreateCar from "./component/car/CreateCar";

import EditTransfer from "./component/transfer/EditTransfer";
import ListTransfer from "./component/transfer/ListTransfer";
import CreateTransfer from "./component/transfer/CreateTransfer";

function App() {
  return (
    <Router>
      
      <Header />

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/" element={<ListTransfer />} />

              <Route path="/passengers/create" element={<CreatePassenger />} />
              <Route path="/passengers/edit/:id" element={<EditPassenger />} />
              <Route path="/passengers" element={<ListPassenger />} />

              <Route path="/cars/create" element={<CreateCar />} />
              <Route path="/cars/edit/:id" element={<EditCar />} />
              <Route path="/cars" element={<ListCar />} />

              <Route path="/transfers/create" element={<CreateTransfer />} />
              <Route path="/transfers/edit/:id" element={<EditTransfer />} />
              <Route path="/transfers" element={<ListTransfer />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
