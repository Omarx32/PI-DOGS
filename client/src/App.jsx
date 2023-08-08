import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
   
    axios.get('/api/dogs')
      .then(response => setDogs(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <ul>
        {dogs.map(dog => (
          <li key={dog.id}>{dog.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
