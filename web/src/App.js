import { useEffect, useState } from 'react';
import './App.css';

async function getData() {
  // fetch the data from our api
  const response = await fetch('http://localhost:8080/data');
  // get the body as JSON
  const json = await response.json();

  return json;
}

function formToJSON(form) {
  const data = {};

  // convert the form element to form data and iterate over it to create an object
  for (const [key, value] of new FormData(form)) {
    data[key] = value;
  }

  return data;
}

async function updateData(key, value) {
  const response = await fetch('http://localhost:8080/data', {
    method: 'PUT', // tell it we're making an update
    body: JSON.stringify({ key, value }), // send the information to update with
    headers: { 'content-type': 'application/json' }, // tell it that it's JSON data
  });

  const json = await response.json();

  if (response.ok) {
    return json; // make sure the request was successful
  }

  throw json; // if not, throw the error we got from the server
}

function App() {
  // data is a piece of state representing what we will get back from the server
  const [data, setData] = useState(null);

  // we create an effect to fetch and set the data
  useEffect(() => {
    getData().then(setData);
  }, []); // it has no dependencies so it only runs once

  // if we have no data, just display a message
  if (!data) {
    return (
      <div className="data">No Data</div>
    );
  }

  async function submitUpdate(e) {
    e.preventDefault(); // prevent the browser from submitting the form
    const { key, value } = formToJSON(e.target); // get our form data
    try {
      const data = await updateData(key, value); // try to update the data
      setData(data); // it was successful, update our local state
    } catch(e) {
      console.log(e); // something went wrong, log it
    }
  }

  // we have the data, show it as a string
  return (
    <>
      <pre className="data">{JSON.stringify(data, null, 2)}</pre>
      <form onSubmit={submitUpdate}>
        <label>
          Key
          <input required name="key" type="text" placeholder="key" />
        </label>
        <label>
          Value
          <input required name="value" type="text" placeholder="value" />
        </label>
        <button>Update Data</button>
      </form>
    </>
  );
}

export default App;
