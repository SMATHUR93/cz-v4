import React, { useEffect, useState } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Person } from '@/types';
import Navbar from 'react-bootstrap/Navbar';


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
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">CZ-V4</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">User Management</h1>
          <button onClick={logout}>Logout</button>
          <br />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="datetime-local" placeholder="Birth Day Time" value={birthdaytime} onChange={(e) => setbBirthdaytime(e.target.value)} />
          <button onClick={() => addPerson({ name, email, dob: birthdaytime })}>Add Person</button>
          <br />
          <ul>
            {people.map((person: Person) => (
              <li key={person.id}>
                {person.name} - ${person.email}
                <button onClick={() => updatePerson(person.id!, { name, email, dob: birthdaytime })}>Edit</button>
                <button onClick={() => deletePerson(person.id!)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Navbar fixed="bottom" className="footer mt-auto py-3 bg-body-tertiary">
        <div className="container">
          <span className="text-body-secondary">© 2014–2025</span>
        </div>
      </Navbar>
    </div>
  );
};
export default Home;


/* import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";


export default function Home () {

    // const [users, setUsers] = useState<User[]>([]);
    const { users, setUsers, addUser, deleteUser } = useUserContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        fetch("/api/users")
        .then(res => res.json())
        .then(data => setUsers([...data]));
    },[]);

    const handleAddUser = async () => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });
        const newUser = await res.json();
        addUser(newUser);
    };

    const handleDeleteUser = async (id: number) => {
        await fetch(`/api/users/${id}`, { 
            method: "DELETE" 
        });
        deleteUser(id);
    };

    // not correct for update and anyways for users we don't need to do it
    const handleUpdateUser = async (id: number, user: User) => {
        let {name, email} = user;
        const res = await fetch("/api/users/${id}", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });
        const updatedUser = await res.json();
        users[id] = updatedUser;
        setUsers([...users]);
    };

    return (
        <div className="container">
            <br/>
            <h2 className="text-primary">Add User</h2>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Button variant="primary" onClick={handleAddUser}>
                Add
            </Button>
            <br/>
            <br/>
            <h3 className="text-primary">User List</h3>
            <Table striped bordered style={{width:'600px'}}>
                <thead>
                    <tr>
                        <th style={{width:'40%'}}>Name</th>
                        <th style={{width:'40%'}}>Email </th>
                        <th style={{width:'20%'}} colSpan={2}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>{
                        console.log(user);
                        return (
                            <tr key={user?.id}>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td><Button variant="primary" onClick={() => handleDeleteUser(user.id)}>Delete</Button></td>
                                <td><Button variant="primary" onClick={() => handleUpdateUser(user.id, user)}>Update</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>            
        </div>
    );

} */