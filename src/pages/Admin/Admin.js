import React, { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import './admin.css';
import { toast } from 'react-toastify';
import { useStore } from '../../stored';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fetchUserVip } from '../../actions/fireStoreActions';

const Admin = () => {
  const user = useStore((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [userVip, setUserVip] = useState([]);
  const Navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const db = getFirestore();
      const q = collection(db, 'users');
      const querySnapshot = await getDocs(q);
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ ...doc.data() });
      });
      return userList;
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };
  const userResult = fetchUser();
  const userVipResult = fetchUserVip();

  useEffect(() => {
    if (!user) {
      Navigate('/404page');
    }
    userResult.then(function (result) {
      setUserList(result);
    });
  }, []);
  useEffect(() => {
    if (!user) {
      Navigate('/404page');
    }
    userVipResult.then(function (result) {
      setUserVip(result);
    });
  }, []);
  const handleDeleteUser = async (data) => {
    const result = window.confirm('Are you sure you want to delete this User?');
    if (result) {
      const result = await deleteUser(data);
      setTimeout(function () {
        window.location.reload(true);
      },3000);
      const newUserList = userList.filter((item) => item.uid !== result.uid);
      setUserList(newUserList);
      toast.success('Delete success !');
      window.location.reload(false);
    }
  };
  return (
    <div className="admin-container">
      <h1>Welcome to Admin TheUTHMovies</h1>
      <h3 className="user-list-name">User List:</h3>
      <table id="user">
        <tbody>
          <tr>
            <th>User UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {userList.map((user, key) => {
            return (
              <tr key={key}>
                <td>{user.uid}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="delete-user-btn" onClick={() => handleDeleteUser(user)}>
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3 className="user-list-name">User Vip Account:</h3>
      <table id="user">
        <tbody>
          <tr>
            <th>User UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {userVip.map((user, key) => {
            return (
              <tr key={key}>
                <td>{user.uid}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="delete-user-btn" onClick={() => handleDeleteUser(user)}>
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3 className="user-list-name">Total Revenue:</h3>
      <h3 id="user">{userVip.length * 20} $</h3>
    </div>
  );
};

export default Admin;
