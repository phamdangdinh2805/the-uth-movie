import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRef } from '../../actions/fireStoreActions';
import { db } from '../../config/firebase';
import { useStore } from '../../stored';
import { toast } from 'react-toastify';
import './upgradeaccount.css';

const Success = () => {
  const Navigate = useNavigate();
  const { user } = useStore((state) => state);
  const Ref = [];
  const handleOnClick = async () => {
    try {
      await UserRef(user, Ref);
      const userRef = doc(db, 'users', Ref[0]);
      const query = await updateDoc(userRef, {
        accountLevel: 'premium',
      });
      toast.success('UPGRADE TO PRO SUCCESS');
      // Email.send({
      //   Host: "smtp.gmail.com",
      //   Username : "<sender’s email address>",
      //   Password : "<email password>",
      //   To : '<recipient’s email address>',
      //   From : "<sender’s email address>",
      //   Subject : "<email subject>",
      //   Body : "<email body>",
      //   }).then(
      //     message => alert("mail sent successfully")
      //   );
      return query;
    } catch (err) {
      toast.error('UPGRADE TO PRO FAIL');
    }
  };
  const handleGoToHome = () => {
    Navigate('/');
  };
  return (
    <div className="success-container">
      <div className="success-description">
        <img className="success-img" src="https://www.plendify.com/assets/images/check_mark.png" />
        <p className="success-info"> Your payment was successful</p>
        <p className="success-des">Thank you for your payment. Now, you can watch all your favorite movies </p>
        <button className="success-btn-active" onClick={() => handleOnClick()} >
          Active Account
        </button>
        <button className="success-btn" onClick={() => handleGoToHome()}>
          Return to HomePage
        </button>
      </div>
    </div>
  );
};

export default Success;
