import React, { useState, useEffect } from 'react';
import useAxios from "../hooks/useAxios";
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newOccurenceAdded, setNewOccurenceAdded] = useState(false);


  const [loginInfo, setLoginInfo] = useState(() => {
    let token = localStorage.getItem('token');
    if (token === {}) { return null;} 
    // console.log("Token algväärtustamine",token);
    return token ? JSON.parse(token) : {};    
  });
// console.log("Token",loginInfo);

  const { response, loading, error } = useAxios({
      method: "get",
      url: `/users`,
      headers: { Authorization: `Bearer ${loginInfo?.token}` },
    },
    newOccurenceAdded
  );



//   console.log("Token päringus",loginInfo?.token);
//   console.log("data",data);

useEffect(() => {
  console.log("Saadud info",response);
  // let andmed = data;
  // console.log("Andmed",andmed);
  //  if (data && Array.isArray(data.users)) {
  //   setUsers(data.users); // Määra andmed data.users väärtusele
  // }
}, [response]);


  useEffect(() => {
    if (error) {
      console.error('Viga kasutajate nimekirja laadimisel', error);
    }
  }, [error]);

  return (
    <div>
      <h2>Kasutajate nimekiri</h2>
      {loading ? (
        <div>Laadimine...</div>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
