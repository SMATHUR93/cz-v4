import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
     const { login, register } = useAuth();
     const router = useRouter();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     return (
          <main className="form-signin w-100 m-auto">

               <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

               <div className="form-floating">
                    <input
                         type="email"
                         className="form-control"
                         id="floatingInput"
                         placeholder="Email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
               </div>

               <div className="form-floating">
                    <input
                         type="password"
                         className="form-control"
                         id="floatingPassword"
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
               </div>

               <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                         Remember me
                    </label>
               </div>
               <button
                    className="btn btn-primary w-100 py-2"
                    onClick={async () => {
                         await login(email, password);
                         router.push('/');
                    }}
               >Sign in</button>
               <br />
               <br />
               <button
                    className="btn btn-primary w-100 py-2"
                    onClick={async () => {
                         await register(email, password);
                         router.push('/');
                    }}
               >Register</button>
               <p className="mt-5 mb-3 text-body-secondary text-align-center">© 2014–2025</p>
          </main>
     );
};
export default Login;