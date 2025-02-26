import React from "react";
import { Navbar } from "react-bootstrap";

const FooterSection = () => {
     return (
          <Navbar fixed="bottom" className="footer mt-auto py-3 bg-body-tertiary">
               <div className="container">
                    <span className="text-body-secondary">© 2014–2025</span>
               </div>
          </Navbar>
     );
};

export default FooterSection;