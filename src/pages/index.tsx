import React, { useEffect, useState } from 'react';
import { usePersonContext } from '@/context/PersonContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Person } from '@/types';

const Home = () => {
  const { user, logout } = useAuth();
  const { people, fetchPeople, addPerson, updatePerson, deletePerson } = usePersonContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    else fetchPeople();
  }, [user]);

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={logout}>Logout</button>
      <br />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => addPerson({ name, email })}>Add Person</button>
      <br />
      <ul>
        {people.map((person: Person) => (
          <li key={person.id}>
            {person.name} - ${person.email}
            <button onClick={() => updatePerson(person.id!, { name, email })}>Edit</button>
            <button onClick={() => deletePerson(person.id!)}>Delete</button>
          </li>
        ))}
      </ul>
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