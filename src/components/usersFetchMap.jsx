import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserMap from '../pages/usersMap';

const UsersFetchMap = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUser(response.data[0])) //Aqui obtenemos solo el primer arreglo
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Localización del Usuario</h1>
      {user && <UserMap user={user} />}
    </div>
  );
};

export default UsersFetchMap;
