import React, { useEffect, useState } from 'react';
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
import { Table } from "react-bootstrap";

import Image from 'next/image';

const UserDetails = () => {

     const backgroundImgs = [
          'bermuda-traingle.svg', 'endless-constellation.svg', 'parabolic-pentagon.svg', 'repeating-chevrons.svg', 'sun-tornado.svg',
          'bullseye-gradient.svg', 'flat-mountains.svg', 'parabolic-rectangle.svg', 'repeating-triangles.svg', 'tortoise-shell.svg',
          'colorful-stingrays.svg', 'geometric-intersection.svg', 'parabolic-triangle.svg', 'rose-petals.svg', 'vanishing-stripes.svg',
          'abstract-envelope.svg', 'confetti-doodles.svg', 'hollowed-boxes.svg', 'pattern-randomized.svg', 'scattered-forcefields.svg',
          'varying-stripes.svg', 'abstract-timekeeper.svg', 'cornered-stairs.svg', 'large-triangles.svg', 'polka-dots.svg',
          'slanted-gradient.svg', 'wavey-fingerprint.svg', 'alternating-arrowhead.svg', 'dalmatian-spots.svg', 'liquid-cheese.svg',
          'protruding-squares.svg', 'spectrum-gradient.svg', 'wintery-sunburst.svg', 'bermuda-circle.svg', 'diagonal-stripes.svg',
          'quantum-gradient.svg', 'square-versatiles.svg', 'zig-zag.svg', 'bermuda-diamond.svg', 'diamond-sunset.svg',
          'page-turner.svg', 'radiant-gradient.svg', 'subtle-prism.svg', 'bermuda-square.svg', 'dragon-scales.svg',
          'parabolic-ellipse.svg', 'rainbow-vortex.svg', 'subtle-stripes.svg'
     ];

     const zodiacs: Record<string, number> = {
          "Rat": 1, "Ox": 2, "Tiger": 3, "Rabbit": 4, "Dragon": 5, "Snake": 6,
          "Horse": 7, "Goat": 8, "Monkey": 9, "Rooster": 10, "Dog": 11, "Pig": 12
     };

     const { logout } = useAuth();
     const { person, people } = usePersonContext();
     const thisPerson = { ...person };

     const [tablularData, setTabularData] = useState<{ name: string, compatibilityPercent: number }[]>([]);

     const router = useRouter();
     const yearSign: string = `${person?.yearSign?.english}`;
     const yearSignWallpaperIndex = zodiacs[yearSign] - 1;
     const yearSignWallpaper = backgroundImgs[yearSignWallpaperIndex];

     const monthSign: string = `${person?.monthSign?.english}`;
     const monthSignWallpaperIndex = zodiacs[monthSign] - 1;
     const monthSignWallpaper = backgroundImgs[monthSignWallpaperIndex + 12];

     const hourSign: string = `${person?.hourSign?.english}`;
     const hourSignWallpaperIndex = zodiacs[hourSign] - 1;
     const hourSignWallpaper = backgroundImgs[hourSignWallpaperIndex + 24];

     useEffect(() => {
          if (!person) {
               router.push('/');
          } else {
               const tempArr = [];
               for (let i = 0; i < people.length; i++) {
                    const currentPerson = people[i];
                    if (currentPerson?.id == thisPerson?.id) {
                         return;
                    } else {
                         let compatibilityPercent = 0.0;

                         const currentPersonYearSign = `${currentPerson?.yearSign?.english.toLowerCase()}`;
                         if (thisPerson?.yearSign?.bestMatch.indexOf(currentPersonYearSign) != -1) {
                              compatibilityPercent += 1 * 25;
                         } else if (thisPerson?.yearSign?.averageMatch.indexOf(currentPersonYearSign) != -1) {
                              compatibilityPercent += 0.75 * 25;
                         } else if (thisPerson?.yearSign?.superBad.indexOf(currentPersonYearSign) != -1) {
                              compatibilityPercent += 0.5 * 25;
                         } else if (thisPerson?.yearSign?.harmful.indexOf(currentPersonYearSign) != -1) {
                              compatibilityPercent += 0.25 * 25;
                         }

                         const currentPersonMonthSign = `${currentPerson?.monthSign?.english.toLowerCase()}`;
                         if (thisPerson?.monthSign?.bestMatch.indexOf(currentPersonMonthSign) != -1) {
                              compatibilityPercent += 1 * 33;
                         } else if (thisPerson?.monthSign?.averageMatch.indexOf(currentPersonMonthSign) != -1) {
                              compatibilityPercent += 0.75 * 33;
                         } else if (thisPerson?.monthSign?.superBad.indexOf(currentPersonMonthSign) != -1) {
                              compatibilityPercent += 0.5 * 33;
                         } else if (thisPerson?.monthSign?.harmful.indexOf(currentPersonMonthSign) != -1) {
                              compatibilityPercent += 0.25 * 33;
                         }

                         const currentPersonhourSign = `${currentPerson?.hourSign?.english.toLowerCase()}`;
                         if (thisPerson?.hourSign?.bestMatch.indexOf(currentPersonhourSign) != -1) {
                              compatibilityPercent += 1 * 42;
                         } else if (thisPerson?.hourSign?.averageMatch.indexOf(currentPersonhourSign) != -1) {
                              compatibilityPercent += 0.75 * 42;
                         } else if (thisPerson?.hourSign?.superBad.indexOf(currentPersonhourSign) != -1) {
                              compatibilityPercent += 0.5 * 42;
                         } else if (thisPerson?.hourSign?.harmful.indexOf(currentPersonhourSign) != -1) {
                              compatibilityPercent += 0.25 * 42;
                         }
                         tempArr.push({
                              name: currentPerson?.name,
                              compatibilityPercent: compatibilityPercent
                         });
                    }
               }
               setTabularData([...tempArr]);
          }
     }, [person, people]);

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
                                        <p > <a className="btn btn-secondary" href="#yearSection" > View details »</a></p >
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
                                        <p>  {`This is the symbol for Month of year`} </p>
                                        <p> <a className="btn btn-secondary" href="#monthSection" > View details »</a></p>
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
                                        <p> {`This is the symbol for Time of Birth`} </p>
                                        <p> <a className="btn btn-secondary" href="#hourSection" > View details »</a></p>
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div id="yearSection" className="row featurette" >
                                   <div className="col-md-7" >
                                        <h4 className="featurette-heading fw-normal lh-3" > The year of {person?.yearSign?.english}</h4>
                                        <h4><p className="text-body-secondary" > It is a {person?.yearSign?.fixedElement} & {person?.yearSign?.yinYang} sign from {person?.yearSign?.trine} Trine.</p></h4>
                                        <p className="lead" >{person?.yearSign?.text}</p>
                                        <div className="lead" >
                                             <ul>
                                                  <li>Best Match is {person?.yearSign?.bestMatch.toString()}</li>
                                                  <li>Average Match is {person?.yearSign?.averageMatch.toString()}</li>
                                                  <li>Bad Match is {person?.yearSign?.superBad.toString()}</li>
                                                  <li>Harmful Match is {person?.yearSign?.harmful.toString()}</li>
                                             </ul>
                                        </div>
                                   </div>
                                   <div className="col-md-5" style={{ position: 'relative', width: '500px', height: '500px' }}>
                                        <Image
                                             // src={`/static/images/wallpapers/square-versatiles.svg`}
                                             src={`/static/images/wallpapers/${yearSignWallpaper}`}
                                             alt={`${person?.yearSign?.english}`}
                                             objectFit="cover"
                                             layout="fill"
                                        />
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div id="monthSection" className="row featurette" >
                                   <div className="col-md-7 order-md-2" >
                                        <h4 className="featurette-heading fw-normal lh-3" > The year of {person?.monthSign?.english}</h4>
                                        <h4><p className="text-body-secondary" > It is a {person?.monthSign?.fixedElement} & {person?.monthSign?.yinYang} sign from {person?.monthSign?.trine} Trine.</p></h4>
                                        <p className="lead" >{person?.monthSign?.text}</p>
                                        <div className="lead" >
                                             <ul>
                                                  <li>Best Match is {person?.monthSign?.bestMatch.toString()}</li>
                                                  <li>Average Match is {person?.monthSign?.averageMatch.toString()}</li>
                                                  <li>Bad Match is {person?.monthSign?.superBad.toString()}</li>
                                                  <li>Harmful Match is {person?.monthSign?.harmful.toString()}</li>
                                             </ul>
                                        </div>
                                   </div>
                                   <div className="col-md-5 order-md-1" style={{ position: 'relative', width: '500px', height: '500px' }}>
                                        <Image
                                             src={`/static/images/wallpapers/${monthSignWallpaper}`}
                                             // src={`/static/images/wallpapers/square-versatiles.svg`}
                                             alt={`${person?.monthSign?.english}`}
                                             objectFit="cover"
                                             layout="fill"
                                        />
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div id="hourSection" className="row featurette" >
                                   <div className="col-md-7" >
                                        <h4 className="featurette-heading fw-normal lh-3" > The year of {person?.hourSign?.english}</h4>
                                        <h4><p className="text-body-secondary" > It is a {person?.hourSign?.fixedElement} & {person?.hourSign?.yinYang} sign from {person?.hourSign?.trine} Trine.</p></h4>
                                        <p className="lead" >{person?.hourSign?.text}</p>
                                        <div className="lead" >
                                             <ul>
                                                  <li>Best Match is {person?.hourSign?.bestMatch.toString()}</li>
                                                  <li>Average Match is {person?.hourSign?.averageMatch.toString()}</li>
                                                  <li>Bad Match is {person?.hourSign?.superBad.toString()}</li>
                                                  <li>Harmful Match is {person?.hourSign?.harmful.toString()}</li>
                                             </ul>
                                        </div>
                                   </div>
                                   <div className="col-md-5" style={{ position: 'relative', width: '500px', height: '500px' }}>
                                        <Image
                                             src={`/static/images/wallpapers/${hourSignWallpaper}`}
                                             // src={`/static/images/wallpapers/square-versatiles.svg`}
                                             alt={`${person?.hourSign?.english}`}
                                             objectFit="cover"
                                             layout="fill"
                                        />
                                   </div>
                              </div>

                              <hr className="featurette-divider" />

                              <div id="compatibilitySection" className="row featurette" >
                                   <div className="col" >
                                        <div className="table-responsive h-100 p-5 bg-body-tertiary border rounded-3">
                                             <h3>Compatibility Table</h3>
                                             <br />
                                             <Table striped bordered>
                                                  <thead>
                                                       <tr>
                                                            <th style={{ width: '50%' }}>Name</th>
                                                            <th style={{ width: '50%' }}>Compatibility</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {Array.isArray(tablularData) ? tablularData.length > 0 ? (tablularData.map((currentPerson: { name: string, compatibilityPercent: number }) => {
                                                            return (
                                                                 <tr key={currentPerson?.name}>
                                                                      <td>{currentPerson?.name}</td>
                                                                      <td>{
                                                                           currentPerson?.compatibilityPercent >= 75 ? <span style={{ color: 'green' }}><b>Good Match </b>at <i>{currentPerson?.compatibilityPercent}</i></span> :
                                                                                currentPerson?.compatibilityPercent >= 50 ? <span style={{ color: 'orange' }}><b>Average Match </b>at <i>{currentPerson?.compatibilityPercent}</i></span> :
                                                                                     currentPerson?.compatibilityPercent >= 20 ? <span style={{ color: 'red' }}><b>Bad Math </b>at <i>{currentPerson?.compatibilityPercent}</i></span> :
                                                                                          <span style={{ color: 'black' }}><b>`Harmful Match`</b></span>
                                                                      }</td>
                                                                 </tr>
                                                            );
                                                       })) : [] : []}
                                                  </tbody>
                                             </Table>
                                        </div>
                                   </div>
                              </div>

                              <hr className="featurette-divider" />
                         </Col>
                    </Row>
               </Container >

               <FooterSection />
          </div >
     );
};

export default UserDetails;
