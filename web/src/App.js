import { useEffect, useState } from 'react';
import './App.css';

async function getData() {
  const response = await fetch('http://localhost:8080/data');
  const json = await response.json();

  return json;
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="data">No Data</div>
    );
  }

  return <div className="data">{JSON.stringify(data)}</div>;
}

export default App;
