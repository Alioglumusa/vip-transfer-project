import React from "react";
import { Link } from "react-router-dom"; // react-router-dom kütüphanesini içe aktarın
import Logo from "../../img/logo.webp"; // Logo resmini eklediğiniz yolunuzu buraya ekleyin

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <img src={Logo} alt="Company Logo" className="img-fluid mb-2" />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, repellat. 
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Pages</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/transfers" className="text-dark">Transfers</Link>
              </li>
              <li>
                <Link to="/passengers" className="text-dark">Passengers</Link>
              </li>
              <li>
                <Link to="/cars" className="text-dark">Cars</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Create</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/transfers/create" className="text-dark">Create Transfers</Link>
              </li>
              <li>
                <Link to="/passengers/create" className="text-dark">Create Passengers</Link>
              </li>
              <li>
                <Link to="/cars/create" className="text-dark">Create Cars</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  <i className="fas fa-envelope"></i><a href="mailto:info@viptransfer.com"> info@viptransfer.com</a>
                </p>
              </li>
              <li>
                <p>
                  <i className="fas fa-phone"></i> <a href="tel:05555555555">0 555 555 55 55</a>
                </p>
              </li>
              <li>
                <p>
                  <i className="fas fa-print"></i> <a href="tel:05555555555">0 555 555 55 55</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-danger" style={{ background: "rgba(0, 0, 0, 0.2)" }}>
        &copy; 2023 VIP Transfer Project. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
