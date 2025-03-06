import React from "react";
import { Button } from "react-bootstrap";
/* import { FontAwesomeIcon } from '/react-fontawesome';
import { faChevronLeft } from '@fontawesome/free-solid-svg-icons'; */
import { useRouter } from 'next/router';

const HeaderSection = ({ logout, backButtonNeeded }: {
     logout: () => Promise<void>,
     backButtonNeeded: boolean
}) => {
     const router = useRouter();
     return (
          <header>
               <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                         {backButtonNeeded == true ? <Button
                              variant="light"
                              className="float-start"
                              onClick={() => {
                                   router.push('/');
                              }}
                         /> : <></>}
                         <a className="navbar-brand" href="#">CZ-V4</a>
                         <Button variant="light" className="float-end" onClick={logout}>Logout</Button>
                    </div>
               </nav>
          </header>
     );
};

export default HeaderSection;