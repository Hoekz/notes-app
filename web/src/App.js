import { useState } from 'react';
import NoteApp from './NoteApp';

function useAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  async function login(email, password) {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));
    setUser(data.user);
    setToken(data.token);
  }

  async function signup(email, password, name) {
    const res = await fetch('http://localhost:8080/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));
    setUser(data.user);
    setToken(data.token);
  }

  return { user, login, signup };
}

export default function App() {
  const { user, login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <NoteApp />;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (name) {
      signup(email, password, name);
    } else {
      login(email, password);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input onChange={e => setName(e.target.value)} placeholder='Name' />
      <label>Email</label>
      <input onChange={e => setEmail(e.target.value)} placeholder='email' />
      <label>Password</label>
      <input onChange={e => setPassword(e.target.value)} placeholder='password' type="password" />
      <button>Login</button>
    </form>
  );
}
