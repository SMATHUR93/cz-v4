import React, { useEffect } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Image from 'next/image';

const UserDetails = () => {

     const { logout } = useAuth();
     const { person } = usePersonContext();
     const router = useRouter();

     useEffect(() => {
          if (!person) {
               router.push('/');
          }
     }, [person]);

     return (
          <div className="d-flex flex-column h-100 justify-content-md-center d-flex align-items-center py-4 bg-body-tertiary">

               <HeaderSection logout={logout} backButtonNeeded={true} />

               <Container className="marketing mt-4 pt-4">
                    <Row>
                         <Col>

                              <div className="text-center bg-body-tertiary">
                                   <div className="container py-5">
                                        <h1 className="text-body-emphasis">Hello <code>{person?.name}</code></h1>
                                        <p className="col-lg-8 mx-auto lead">
                                             Lets check your horoscopes
                                        </p>
                                   </div>
                              </div>

                              <div className="row" >
                                   <div className="col-lg-4" >
                                        <OverlayTrigger
                                             key="top"
                                             placement="top"
                                             overlay={
                                                  <Tooltip id={`tooltip-year-${person?.yearSign?.english}`}>
                                                       {`${person?.yearSign?.english}`}
                                                  </Tooltip>
                                             }
                                        ><Image
                                                  src={`/static/images/${person?.yearSign?.english}.svg`}
                                                  alt={`${person?.yearSign?.english}`}
                                                  width={130}
                                                  height={130}
                                             /></OverlayTrigger>
                                        <h2 className="fw-normal" > {person?.yearSign?.english} </h2>
                                        <p>  {`This is the symbol for year of Birth`} </p>
                                        <p > <a className="btn btn-secondary" href="#" > View details »</a></p >
                                   </div>
                                   <div className="col-lg-4" >
                                        <OverlayTrigger
                                             key="top"
                                             placement="top"
                                             overlay={
                                                  <Tooltip id={`tooltip-year-${person?.monthSign?.english}`}>
                                                       {`${person?.monthSign?.english}`}
                                                  </Tooltip>
                                             }
                                        ><Image
                                                  src={`/static/images/${person?.monthSign?.english}.svg`}
                                                  alt={`${person?.monthSign?.english}`}
                                                  width={130}
                                                  height={130}
                                             /></OverlayTrigger>
                                        <h2 className="fw-normal" > {person?.monthSign?.english} </h2>
                                        <p>  {`This is the symbol for year of Month`} </p>
                                        <p> <a className="btn btn-secondary" href="#" > View details »</a></p>
                                   </div>
                                   <div className="col-lg-4" >
                                        <OverlayTrigger
                                             key="top"
                                             placement="top"
                                             overlay={
                                                  <Tooltip id={`tooltip-year-${person?.hourSign?.english}`}>
                                                       {`${person?.hourSign?.english}`}
                                                  </Tooltip>
                                             }
                                        ><Image
                                                  src={`/static/images/${person?.hourSign?.english}.svg`}
                                                  alt={`${person?.hourSign?.english}`}
                                                  width={130}
                                                  height={130}
                                             /></OverlayTrigger>
                                        <h2 className="fw-normal" > {person?.hourSign?.english} </h2>
                                        <p> {`This is the symbol for time of Birth`} </p>
                                        <p> <a className="btn btn-secondary" href="#" > View details »</a></p>
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div className="row featurette" >
                                   <div className="col-md-7" >
                                        <h2 className="featurette-heading fw-normal lh-1" > First featurette heading. <span className="text-body-secondary" > It’ll blow your mind.</span></h2 >
                                        <p className="lead" >{person?.yearSign?.text}</p>
                                   </div>
                                   <div className="col-md-5" >
                                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false" > <title>Placeholder </title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect > <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em" > 500x500 </text></svg >
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div className="row featurette" >
                                   <div className="col-md-7 order-md-2" >
                                        <h2 className="featurette-heading fw-normal lh-1" > Oh yeah, it’s that good. <span className="text-body-secondary" > See for yourself.</span></h2 >
                                        <p className="lead" > {person?.monthSign?.text}</p>
                                   </div>
                                   <div className="col-md-5 order-md-1" >
                                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false" > <title>Placeholder </title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect > <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em" > 500x500 </text></svg >
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div className="row featurette" >
                                   <div className="col-md-7" >
                                        <h2 className="featurette-heading fw-normal lh-1" > And lastly, this one. <span className="text-body-secondary" > Checkmate.</span></h2 >
                                        <p className="lead" >{person?.hourSign?.text}</p>
                                   </div>
                                   <div className="col-md-5" >
                                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false" > <title>Placeholder </title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect > <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em" > 500x500 </text></svg >
                                   </div>
                              </div>

                              <hr className="featurette-divider" />
                         </Col>
                    </Row>
               </Container>

               <FooterSection />
          </div>
     );
};

export default UserDetails;
