import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login() {
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // or 'register'

  if (user) {
    return (
      <div style={{ padding: 40 }}>
        <p>Welcome, {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '80px auto', padding: 20, borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: 10, background: '#4e54c8', color: '#fff', border: 'none', borderRadius: 4 }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: '#4e54c8', background: 'none', border: 'none', cursor: 'pointer' }}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}