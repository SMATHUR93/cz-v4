import { Person } from '@/types';
import { usePersonContext } from '@/context/PersonContext';
import { useRouter } from 'next/router';
import { Button, Table } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'next/image';

const UserTable = ({ name, email, birthdaytime }: {
     // props: any
     /* people: Person[],
     updatePerson: (id: string, person: Person) => Promise<void>,
     deletePerson: (id: string) => Promise<void>, */
     name: string,
     email: string,
     birthdaytime: string
}) => {
     const router = useRouter();
     const { person, people, updatePerson, deletePerson, fetchPerson } = usePersonContext();
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
                         {Array.isArray(people) ? people.length > 0 ? (people.map((currentPerson: Person) => {
                              return (
                                   <tr key={currentPerson?.id} onClick={async () => {
                                        await fetchPerson(currentPerson.id!);
                                        console.log("Selected User is " + person?.name);
                                        router.push('/userDetails');
                                   }}>
                                        <td>{currentPerson?.name}</td>
                                        <td>{currentPerson?.email}</td>
                                        <td>{new Date(currentPerson?.dob)?.toUTCString()}</td>
                                        <td>
                                             <OverlayTrigger
                                                  key="top"
                                                  placement="top"
                                                  overlay={
                                                       <Tooltip id={`tooltip-year-${currentPerson?.yearSign?.english}`}>
                                                            {`${currentPerson?.yearSign?.english}`}
                                                       </Tooltip>
                                                  }
                                             ><Image
                                                       src={`/static/images/${currentPerson?.yearSign?.english}.svg`}
                                                       alt={`${currentPerson?.yearSign?.english}`}
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td>
                                             <OverlayTrigger
                                                  key="top"
                                                  placement="top"
                                                  overlay={
                                                       <Tooltip id={`tooltip-month-${currentPerson?.monthSign?.english}`}>
                                                            {`${currentPerson?.monthSign?.english}`}
                                                       </Tooltip>
                                                  }
                                             ><Image
                                                       src={`/static/images/${currentPerson?.monthSign?.english}.svg`}
                                                       alt={`${currentPerson?.monthSign?.english}`}
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td>
                                             <OverlayTrigger
                                                  key="top"
                                                  placement="top"
                                                  overlay={
                                                       <Tooltip id={`tooltip-hour-${currentPerson?.hourSign?.english}`}>
                                                            {`${currentPerson?.hourSign?.english}`}
                                                       </Tooltip>
                                                  }
                                             ><Image
                                                       src={`/static/images/${currentPerson?.hourSign?.english}.svg`}
                                                       alt={`${currentPerson?.hourSign?.english}`}
                                                       width={50}
                                                       height={50}
                                                  /></OverlayTrigger>
                                        </td><td onClick={(e) => { e.stopPropagation(); return false; }}>
                                             <div className="hstack gap-3">
                                                  <Button variant="light" className="btn btn-outline-secondary" onClick={() => updatePerson(currentPerson.id!, { name, email, dob: new Date(birthdaytime) })}>Update</Button>
                                                  <div className="vr"></div>
                                                  <Button variant="light" className="btn btn-outline-danger" onClick={() => deletePerson(currentPerson.id!)}>Delete</Button>
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