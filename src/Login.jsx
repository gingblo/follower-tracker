
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9fafb',
    }}>
      <div style={{
        background: '#fff',
        padding: 30,
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: 400,
      }}>
        <h2 style={{ marginBottom: 20 }}>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              marginBottom: 10,
              padding: 10,
              width: '100%',
              borderRadius: 6,
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              marginBottom: 10,
              padding: 10,
              width: '100%',
              borderRadius: 6,
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <button type="submit" style={{
            background: '#4e54c8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: 10,
            width: '100%',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <button onClick={handleGoogleLogin} style={{
          marginTop: 12,
          width: '100%',
          padding: 10,
          borderRadius: 6,
          border: '1px solid #4e54c8',
          background: '#fff',
          color: '#4e54c8',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          Sign in with Google
        </button>

        <p style={{ marginTop: 16, fontSize: 14 }}>
          {isRegistering ? 'Already registered?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: '#4e54c8', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isRegistering ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}
