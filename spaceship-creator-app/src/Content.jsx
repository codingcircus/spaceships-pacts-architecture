import React, {useState, useEffect} from 'react';

import {
  getSpaceships,
} from './api';
import CreateForm from './CreateForm';
import './Content.css';

export default function Content() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshSpaceships = async () => {
    const fetchedSpaceships = await getSpaceships();

    setSpaceships(fetchedSpaceships);
    setLoading(false);
  }
  
  // Initial fetch data
  useEffect(() => {
    setLoading(true);
    refreshSpaceships();
  }, []);

  if (loading) {
    return <p>Loading ...</p>
  };

  return (
    <>
      <div className="content">
        <CreateForm
          refreshSpaceships={refreshSpaceships}
        />
        <p>Current Spaceship Count: {spaceships.length}</p>
      </div>
    </>
  )
}