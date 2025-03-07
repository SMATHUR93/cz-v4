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
                         {backButtonNeeded == true ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" style={{ color: 'white' }} viewBox="0 0 16 16" onClick={() => {
                                   router.push('/');
                              }}>
                                   <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                              </svg>
                         ) : <></>}
                         <a className="navbar-brand float-start" href="#">CZ-V4</a>
                         <Button variant="light" className="float-end" onClick={logout}>Logout</Button>
                    </div>
               </nav>
          </header>
     );
};

export default HeaderSection;