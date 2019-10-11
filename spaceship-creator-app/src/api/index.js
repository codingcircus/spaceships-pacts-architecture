import fetch from 'node-fetch';

const apiUrl = process.env.REACT_APP_SPACESHIPS_SERVICE;

export async function getSpaceships() {

  const response = await fetch(`${apiUrl}/spaceships`, {
    method: 'GET',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  return responseData;
}

export async function postSpaceship(data) {
  const response = await fetch(`${apiUrl}/spaceships`, {
    method: 'POST',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return responseData;
}