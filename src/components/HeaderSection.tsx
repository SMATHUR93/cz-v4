import React from "react";
import { Button } from "react-bootstrap";

const HeaderSection = ({ logout }: {
     logout: () => Promise<void>
}) => {
     return (
          <header>
               <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                         <a className="navbar-brand" href="#">CZ-V4</a>
                         <Button variant="light" className="float-end" onClick={logout}>Logout</Button>
                    </div>
               </nav>
          </header>
     );
};

export default HeaderSection;