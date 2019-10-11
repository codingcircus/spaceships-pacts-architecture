import React, {useState} from 'react';

import {
  postSpaceship,
} from './api';
import './CreateForm.css';

const availableSizes = ['small', 'medium', 'large'];

export default function Content({
  refreshSpaceships,
}) {
  const initialFormState = {
    name: '',
    description: '',
    size: availableSizes[0],
  };

  const [formState, setFormState] = useState(initialFormState);
  const [spaceship, setSpaceship] = useState(null);

  const updateFormState = (ev) => setFormState({
    ...formState,
    [ev.target.name]: ev.target.value,
  });

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();

        // 1. Post Data
        const newSpaceship = await postSpaceship(formState);

        setSpaceship(newSpaceship);

        // 2. Clear state
        setFormState(initialFormState);

        setTimeout(() => {
          setSpaceship(null);
        }, 3000);

        // 3. Refresh data
        refreshSpaceships();
      }}
    >
      <h1>Create new spaceship</h1>
      <div className="inputGroup">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={formState.name}
          name="name"
          id="name"
          onChange={updateFormState}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="size">Size</label>
        <div className="selectContainer">
          <select
            id="size"
            name="size"
            onChange={updateFormState}
          >
            {availableSizes.map(size => <option key={`size-${size}`}>{size}</option>)}
          </select>
        </div>
      </div>
      <div className="inputGroup">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={updateFormState}
          value={formState.description}
        />
      </div>
      <button type="submit">Create</button>
      {spaceship && (
        <p className="toast toast--success">Created new Spaceship named ”{spaceship.name}“ with ID {spaceship.id}</p>
      )}
    </form>
  )
}