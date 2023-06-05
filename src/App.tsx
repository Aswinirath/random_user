import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchRandomUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const userData: User = {
        name: {
          first: response.data.results[0].name.first,
          last: response.data.results[0].name.last
        },
        email: response.data.results[0].email
      };
      setUser(userData);
      localStorage.setItem('randomUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem('randomUser');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    } else {
      fetchRandomUser();
    }
  }, []);

  const handleRefresh = () => {
    fetchRandomUser();
  };

  return (
    <div>
      <h1>Random User</h1>
      {user ? (
        <div>
          <p>Name: {user.name.first} {user.name.last}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default App;
