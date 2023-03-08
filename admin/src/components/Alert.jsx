import { useEffect } from 'react';
import './css/alert.css';
import { CSSTransition } from 'react-transition-group';
const Alert = ({ msg, type, showAlert }) => {
  useEffect(() => {
    let time = setTimeout(() => {
      showAlert(false, '', '');
    }, 3000);
    return () => clearTimeout(time);
  }, [msg]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
