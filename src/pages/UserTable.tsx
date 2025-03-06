import { Person } from '@/types';
import { Button, Table } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'next/image';

const UserTable = ({ people, updatePerson, deletePerson, name, email, birthdaytime }: {
     // props: any
     people: Person[],
     updatePerson: (id: string, person: Person) => Promise<void>,
     deletePerson: (id: string) => Promise<void>,
     name: string,
     email: string,
     birthdaytime: string
}) => {
     return (
          <div className="table-responsive h-100 p-5 bg-body-tertiary border rounded-3">
               <h3>User List</h3>
               <br />
               <Table striped bordered>
                    <thead>
                         <tr>
                              <th>Name</th>
                              <th>Email Address</th>
                              <th>Date of Birth </th>
                              <th>Year Sign </th>
                              <th>Month Sign </th>
                              <th>Hour Sign </th>
                              <th>Actions </th>
                         </tr>
                    </thead>
                    <tbody>
                         {Array.isArray(people) ? people.length > 0 ? (people.map((person: Person) => {
                              return (
                                   <tr key={person?.id}>
                                        <td>{person?.name}</td>
                                        <td>{person?.email}</td>
                                        <td>{new Date(person?.dob)?.toUTCString()}</td>
                                        <td>
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
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td>
                                             <OverlayTrigger
                                                  key="top"
                                                  placement="top"
                                                  overlay={
                                                       <Tooltip id={`tooltip-month-${person?.monthSign?.english}`}>
                                                            {`${person?.monthSign?.english}`}
                                                       </Tooltip>
                                                  }
                                             ><Image
                                                       src={`/static/images/${person?.monthSign?.english}.svg`}
                                                       alt={`${person?.monthSign?.english}`}
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td>
                                             <OverlayTrigger
                                                  key="top"
                                                  placement="top"
                                                  overlay={
                                                       <Tooltip id={`tooltip-hour-${person?.hourSign?.english}`}>
                                                            {`${person?.hourSign?.english}`}
                                                       </Tooltip>
                                                  }
                                             ><Image
                                                       src={`/static/images/${person?.hourSign?.english}.svg`}
                                                       alt={`${person?.hourSign?.english}`}
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td>
                                             <div className="hstack gap-3">
                                                  <Button variant="light" className="btn btn-outline-secondary" onClick={() => updatePerson(person.id!, { name, email, dob: new Date(birthdaytime) })}>Update</Button>
                                                  <div className="vr"></div>
                                                  <Button variant="light" className="btn btn-outline-danger" onClick={() => deletePerson(person.id!)}>Delete</Button>
                                             </div>
                                        </td>
                                   </tr>
                              );
                         })) : [] : []}
                    </tbody>
               </Table>
          </div>
     );
};

export default UserTable;