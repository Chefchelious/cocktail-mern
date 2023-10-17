import React from 'react';
import { Link } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import { useAppSelector } from '../../../app/hook.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import './AppToolbar.css';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      <div className="header__content container">
        <Link className="header__logo" to="/">
          chink chink
        </Link>

        <div>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</div>
      </div>
    </header>
  );
};

export default AppToolbar;
