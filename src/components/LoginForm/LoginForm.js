import React from 'react';
import './loginform.css';
import { useStore } from '../../stored';
import { getAdditionalUserInfo, signInWithPopup} from 'firebase/auth';
import { FaFacebook } from 'react-icons/fa';
import { auth, googleProvider } from '../../config/firebase';
import { toast } from 'react-toastify';
import { addUser } from '../../actions/fireStoreActions';
import { MdSmartDisplay } from 'react-icons/md';
import { FcVoicemail } from 'react-icons/fc';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  const { loading, setLoading } = useStore((state) => state);
  const handleLogin = async (Provider) => {
    setLoading(true);
    try {
      const data = await signInWithPopup(auth, Provider);
      const { displayName, email, photoURL, uid } = data.user;
      const details = getAdditionalUserInfo(data);
      if (details.isNewUser) {
        await addUser({ displayName, email, photoURL, uid });
      }
      toast.success('Login Success');
      setLoading(false);
      return;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-content">
        <MdSmartDisplay color="#04aa6d" className="login-logo" />
        <h1 className="login-form-title">Login to TheUTHMovies</h1>
        <div className="login-form-social">
          <button className={`login-form-button login-form-google`}>
            <FcVoicemail className="fa-facebook" />
            <span>Use Email</span>
          </button>
          <button
            className={`login-form-button login-form-google ${loading ? 'disableButton' : ''}`}
            disabled={loading}
            onClick={() => handleLogin(googleProvider)}
          >
            <FcGoogle className="fa-facebook" />
            <span>Continue with Google</span>
          </button>
          <button className={`login-form-button login-form-google`}>
            <FaFacebook className="fa-facebook" color="rgba(0, 153, 255, 0.815)" />
            <span>Continue with FaceBook</span>
          </button>
          <div>
            <span className="login-form-account">
              Do not have an account? <a href="/">Register</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
