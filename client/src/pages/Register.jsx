import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../redux/fetchToken';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [notification, setNotification] = useState('');
  const [redirect, setRedirect] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();

    setNotification('');
    if (password === password2) {
      try {
        const res = await axios
          .create({
            baseURL: BASE_URL,
          })
          .post('/auth/register', { username, email, password });
        toast.success('Account created');
        setRedirect(true);
        window.location.replace('/login');
      } catch (error) {
        console.log(error.response.data);
        setNotification(error.response.data);
      }
    } else setNotification('Entered password must be the same');
  };
  return (
    <section className="register-section">
      <Toaster />
      <div className="register-container max-width">
        <h2>Sign up</h2>

        <div className="form-container">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm the password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button type="submit" className="authorize-btn">
              Sign up
            </button>
          </form>
          {notification !== '' && (
            <p style={{ color: 'red' }}>{notification}</p>
          )}
          <p>
            By signing up, you agree to our <Link to="/">Privacy Policy</Link>{' '}
            and <Link to="/">Terms of Use</Link>.
          </p>

          <p>
            Already have an account?{' '}
            <b>
              <Link to="/login">Sign in!</Link>
            </b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
