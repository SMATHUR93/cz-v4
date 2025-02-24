import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Person } from "@/types"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface PersonContext {
     people: Person[];
     fetchPeople: () => Promise<void>;
     addPerson: (person: Person) => Promise<void>;
     updatePerson: (id: string, person: Person) => Promise<void>;
     deletePerson: (id: string) => Promise<void>;
}

const PersonContext = createContext<PersonContext | undefined>(undefined);

const PersonProvider = ({ children }: { children: ReactNode }) => {
     const [people, setPeople] = useState<Person[]>([]);
     const [userAuthenticated, setUserAuthenticated] = useState(false);
     const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8888" : "";

     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
               setUserAuthenticated(!!user);
               if (user) {
                    fetchPeople();
               }
          });
          return () => unsubscribe();
     }, []);

     const fetchPeople = async () => {
          if (!userAuthenticated) {
               return; // Prevent fetching if not logged in.
          }
          const currentUser = auth.currentUser;
          if (!currentUser) {
               throw new Error(`User not Authenticated`);
          }
          const token = await currentUser.getIdToken();
          try {
               const response = await fetch(`${API_BASE_URL}/.netlify/functions/fetchPeople`, {
                    headers: {
                         authorization: `Bearer ${token}`
                    }
               });
               if (!response.ok) {
                    throw new Error(`Failed to fetch People Data`);
               }
               const data = await response.json();
               setPeople(data);
          } catch (error: unknown) {
               console.log(`Error fetching people data : ${error}`);
          }
     };

     const addPerson = async (person: Person) => {
          if (!userAuthenticated) {
               return; // Prevent fetching if not logged in.
          }
          const currentUser = auth.currentUser;
          if (!currentUser) {
               throw new Error(`User not Authenticated`);
          }
          const token = await currentUser.getIdToken();
          try {
               const response = await fetch(`${API_BASE_URL}/.netlify/functions/addPerson`, {
                    method: "POST",
                    body: JSON.stringify(person),
                    headers: {
                         authorization: `Bearer ${token}`
                    }
               });
               if (!response.ok) {
                    throw new Error(`Failed to add person.`);
               }
               const data = await response.json();
               setPeople([...people, data]);
          } catch (error: unknown) {
               console.log(`Error adding person : ${error}`);
          }
     };

     const updatePerson = async (id: string, person: Person) => {
          if (!userAuthenticated) {
               return; // Prevent fetching if not logged in.
          }
          const currentUser = auth.currentUser;
          if (!currentUser) {
               throw new Error(`User not Authenticated`);
          }
          const token = await currentUser.getIdToken();
          try {
               const response = await fetch(`${API_BASE_URL}/.netlify/functions/updatePerson`, {
                    method: "PUT",
                    body: JSON.stringify({ ...person, id }),
                    headers: {
                         authorization: `Bearer ${token}`
                    }
               });
               if (!response.ok) {
                    throw new Error(`Failed to update person.`);
               }
               fetchPeople();
          } catch (error: unknown) {
               console.log(`Error updating person : ${error}`);
          }
     };

     const deletePerson = async (id: string) => {
          if (!userAuthenticated) {
               return; // Prevent fetching if not logged in.
          }
          const currentUser = auth.currentUser;
          if (!currentUser) {
               throw new Error(`User not Authenticated`);
          }
          const token = await currentUser.getIdToken();
          try {
               const response = await fetch(`${API_BASE_URL}/.netlify/functions/deletePerson`, {
                    method: "DELETE",
                    body: JSON.stringify({ id }),
                    headers: {
                         authorization: `Bearer ${token}`
                    }
               });
               if (!response.ok) {
                    throw new Error(`Failed to delete person.`);
               }
               fetchPeople();
          } catch (error: unknown) {
               console.log(`Error deleting person : ${error}`);
          }
     };

     return (
          < PersonContext.Provider value={{
               people,
               fetchPeople,
               addPerson,
               updatePerson,
               deletePerson
          }}>
               {children}
          </PersonContext.Provider >
     );

};

export default PersonProvider;

export const usePersonContext = () => {
     const context = useContext(PersonContext);
     if (!context) {
          throw new Error("usePerson must be used within a PersonProvider");
     }
     return context;
};

console.log(`usePersonContext  = ${usePersonContext}`);
