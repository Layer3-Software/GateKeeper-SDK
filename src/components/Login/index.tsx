import React, { useContext } from 'react';
import accountIcon from '../../assets/account.png';
import useAuth from '../../hooks/useAuth';
import Container from '../Container';
import { GateKeeperContext } from '../../context/GatekeeperContext';

const Login = () => {
  const { isLoggedIn, customization } = useContext(GateKeeperContext);
  const { doLogin, loginStatus, isLoading } = useAuth();

  const {
    backgroundColor,
    textColor,
    buttonTextColor,
    primaryColor,
  } = customization;

  if (isLoggedIn) return null;
  return (
    <Container bgColor={backgroundColor!} textColor={textColor!}>
      <div className="modal-body">
        <div className="modal-text">
          <img src={accountIcon} width="260px" alt="Account" />
          <h2>Let’s start your journey</h2>
        </div>
        <button
          id="btn-success"
          onClick={doLogin}
          className="button-basic"
          style={{ color: buttonTextColor, backgroundColor: primaryColor }}
        >
          {isLoading ? 'Please wait...' : 'Login'}
        </button>
        <h3 style={{ marginTop: '15px' }}>{loginStatus}</h3>
      </div>
    </Container>
  );
};

export default Login;
