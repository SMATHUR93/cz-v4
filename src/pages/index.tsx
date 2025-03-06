import React, { useEffect, useState } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Button, Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import UserTable from './UserTable';

const Home = () => {
  const { user, logout } = useAuth();
  const { fetchPeople, addPerson } = usePersonContext();
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

      <HeaderSection logout={logout} backButtonNeeded={false} />

      <Container>

        <Row className="justify-content-md-center">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Chinese Zodiacs</h1>
                <ul className="col-lg-10 fs-4">
                  <li className="mb-0">Just enter your user specifics in the form beside.</li>
                  <li className="mb-0"> And we will get 3 aspect based zodiac details. </li>
                  <li className="mb-0">Click on saved user in table below to open all details</li>
                </ul>
              </div>
              <div className="col-md-10 mx-auto col-lg-5">
                <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                  <div className="form-floating mb-3">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="email" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                  </div>
                  <div className="form-floating mb-3">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                  </div>
                  <div className="form-floating mb-3">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="datetime-local" placeholder="Birth Day Time" value={birthdaytime} onChange={(e) => setbBirthdaytime(e.target.value)} />
                    </Form.Group>
                  </div>
                  <Button className="w-100 btn btn-lg btn-primary" variant="primary" onClick={() => addPerson({ name, email, dob: new Date(birthdaytime) })}>
                    Add Person
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <UserTable name={name} email={email} birthdaytime={birthdaytime} />
          </Col>
        </Row>
      </Container>
      {/* </main> */}

      <FooterSection />

    </div>
  );
};
export default Home;