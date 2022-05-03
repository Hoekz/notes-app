import { useEffect, useState } from 'react';
import './App.css';

async function getData() {
  // fetch the data from our api
  const response = await fetch('http://localhost:8080/data');
  // get the body as JSON
  const json = await response.json();

  return json;
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

  // we have the data, show it as a string
  return <div className="data">{JSON.stringify(data)}</div>;
}

export default App;
