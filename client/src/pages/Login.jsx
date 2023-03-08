import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/apiCalls';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <section className="register-section">
      <div className="register-container max-width">
        <Toaster />
        <h2>Sign in</h2>
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={`${
                isFetching ? 'authorize-btn-wait' : 'authorize-btn'
              } `}
            >
              Sign in
            </button>
          </form>
          {isError && (
            <p style={{ color: 'red' }}>
              Something went wrong... Check your login and password
            </p>
          )}
          <p>
            <Link to="/">Forgot password?</Link>
          </p>
          <p>
            By logging in, you agree to our <Link to="/">Privacy Policy</Link>{' '}
            and <Link to="/">Terms of Use</Link>.
          </p>

          <p className="join-btn">
            Not a member?{' '}
            <b>
              <Link to="/register">Join us!</Link>
            </b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
