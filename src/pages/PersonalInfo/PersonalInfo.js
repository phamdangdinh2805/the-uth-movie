import React from 'react';
import { useStore } from '../../stored';
import './personalInfo.css';
import { FcVoicemail, FcCalendar, FcBusinessman, FcPrivacy } from 'react-icons/fc';
import { FaUserAlt } from 'react-icons/fa';
const personalInformation = [
  {
    key: 1,
    title: 'Full name',
    icon: FaUserAlt,
    attribute: 'displayName',
  },
  {
    key: 2,
    title: 'E-mail',
    icon: FcVoicemail,
    attribute: 'email',
  },
  {
    key: 3,
    title: 'Birthday',
    icon: FcCalendar,
    attribute: 'birthday',
  },
  {
    key: 4,
    title: 'Gender',
    icon: FcBusinessman,
    attribute: 'gender',
  },
  {
    key: 5,
    title: 'Password',
    icon: FcPrivacy,
    attribute: 'password',
  },
  {
    key: 6,
    title: 'PhoneNumber',
    icon: FcPrivacy,
    attribute: 'phoneNumber',
  },
];
const PersonalInfo = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="personal-info-container">
      <div className="personal-info-avata">
        <img alt="avatar" src={user?.photoURL} />
        <h1>{user?.displayName}</h1>
      </div>
      <div className="personal-info-description">
        {personalInformation.map((item) => (
          <div key={item.key} className="personal-info-description-item">
            <item.icon className="personal-info-description-icon"/>
            <div className="personal-info-name">
              <div>{item.title}</div>
              <span>{user?.[item.attribute] || "(not update)"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;
