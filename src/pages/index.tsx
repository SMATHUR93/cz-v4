import React, { useEffect, useState } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Person } from '@/types';
import { Button, Form, Table } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

const Home = () => {
  const { user, logout } = useAuth();
  const { people, fetchPeople, addPerson, updatePerson, deletePerson } = usePersonContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdaytime, setbBirthdaytime] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    else fetchPeople();
  }, [user]);

  return (
    <div className="d-flex flex-column h-100 justify-content-md-center d-flex align-items-center py-4 bg-body-tertiary">

      <HeaderSection />

      {/* <main className="flex-shrink-0">
 */}
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="11" >
            <h1 className="mt-5">User Management</h1>
          </Col>
          <Col lg="1" >
            <Button variant="light" className="mt-5" onClick={logout}>Logout</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <br></br>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control type="email" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
          </Col><Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Col><Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Birth Day Time</Form.Label> */}
              <Form.Control type="datetime-local" placeholder="Birth Day Time" value={birthdaytime} onChange={(e) => setbBirthdaytime(e.target.value)} />
            </Form.Group>
          </Col><Col className="clearfix">
            <Button className="float-end" variant="primary" onClick={() => addPerson({ name, email, dob: new Date(birthdaytime) })}>
              Add Person
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <br></br>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Table striped bordered>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '25%' }}>Email Address</th>
                  <th style={{ width: '25%' }}>Date of Birth </th>
                  <th style={{ width: '25%' }} colSpan={2}> Actions </th>
                </tr>
              </thead>
              <tbody>
                {people.map((person: Person) => {
                  return (
                    <tr key={person?.id}>
                      <td>{person?.name}</td>
                      <td>{person?.email}</td>
                      <td>{new Date(person?.dob)?.toUTCString()}</td>
                      <td>
                        <div className="hstack gap-3">
                          {/* <button type="button" className="btn btn-secondary">Submit</button> */}
                          <Button variant="light" className="btn btn-outline-secondary" onClick={() => updatePerson(person.id!, { name, email, dob: new Date(birthdaytime) })}>Update</Button>

                          <div className="vr"></div>
                          {/* <button type="button" className="btn btn-outline-danger">Reset</button> */}
                          <Button variant="light" className="btn btn-outline-danger" onClick={() => deletePerson(person.id!)}>Delete</Button>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {/* </main> */}

      <FooterSection />

    </div>
  );
};
export default Home;