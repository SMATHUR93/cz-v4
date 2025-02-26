import React, { useEffect, useState } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Person } from '@/types';
import { Button, Form, Table } from "react-bootstrap";
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
    <div className="d-flex flex-column h-100">
      <HeaderSection />

      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">User Management</h1>
          <button onClick={logout}>Logout</button>
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control type="email" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Birth Day Time</Form.Label> */}
            <Form.Control type="datetime-local" placeholder="Birth Day Time" value={birthdaytime} onChange={(e) => setbBirthdaytime(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={() => addPerson({ name, email, dob: new Date(birthdaytime) })}>
            Add Person
          </Button>

          <br />

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
                    <td>{new Date(person?.dob)?.toISOString()}</td>
                    <td>
                      <Button variant="primary" onClick={() => deletePerson(person.id!)}>Delete</Button>
                      <Button variant="primary" onClick={() => updatePerson(person.id!, { name, email, dob: new Date(birthdaytime) })}>Update</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
export default Home;