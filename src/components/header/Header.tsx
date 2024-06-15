import React, { useState, useEffect } from 'react';
import './Header.scss';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // TODO - isLoggedIn should be set without having to reload page
  useEffect(() => {
    setIsLoggedIn(
      localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== ''
    );
  }, []);

  return (
    <header>
      <div className="logo">
        <a href="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Papyr Logo. Links to the Papyr home page."
            onError={(e) => {
              console.log(e);
            }}
          />
        </a>
      </div>
      <div className="login">
        <a className="link" href={isLoggedIn ? '/logout' : '/login'}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </a>
      </div>
    </header>
  );
}
