import './css/login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h1>DASHBOARD</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="login"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
