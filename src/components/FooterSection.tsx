import React from "react";
import { Navbar } from "react-bootstrap";

const FooterSection = () => {
     return (
          <Navbar fixed="bottom" className="footer mt-auto py-3 bg-body-tertiary">
               <div className="container">
                    <p className="float-end" > <a href="#" > Back to top </a></p >
                    <p>© 2017–2024 Company, Inc. · <a href="#" > Privacy </a> · <a href="#">Terms</a > </p>
               </div>
          </Navbar>
     );
};

export default FooterSection;