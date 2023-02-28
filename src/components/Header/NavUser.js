import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import slugify from 'slugify';
import { fetchUserFromApi } from '../../actions/fireStoreActions';

const NavUser = ({ user }) => {
  const Navigate = useNavigate();
  const [userAdmin, setUserAdmin] = useState('');
  const [userAdminName, setUserAdminName] = useState('');
  useEffect(() => {
    const userAdminResult = fetchUserFromApi('Nybx3DqcCLXcGycTDfh214pYILl1');
    userAdminResult.then(function (result) {
      setUserAdmin(result.at(0).photoURL);
      setUserAdminName(result.at(0).displayName);
    });
  }, []);
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      Navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="header-user">
      <img alt="avatar" src={ userAdmin || user.photoURL} />
      <ul className="header-user-list">
        <div className="header-user-info">
          <img alt="avatar" src={ userAdmin || user.photoURL} />
          <div>
            <li className="header-user-info-name">{userAdminName || user.displayName}</li>
            <p className="header-user-info-mail">
              @
              {slugify(user.displayName  ?? user.name ?? userAdminName ?? '', {
                locale: 'vi',
                lower: true,
                strict: true,
              })}
            </p>
          </div>
        </div>
        <li className="header-user-item">{user.email}</li>
        <li className="header-user-item">
          <Link to="/favorite-movie">Favorite</Link>
        </li>
        <div className="header-user-item">
          <Link to="/personal-infomation">Personal infomation</Link>
          <li onClick={handleLogOut}>Log Out</li>
        </div>
      </ul>
    </div>
  );
};

export default NavUser;
