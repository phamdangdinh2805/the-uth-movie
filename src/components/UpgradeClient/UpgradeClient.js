import React from 'react'
import { Link } from 'react-router-dom';
import './upgradeclient.css'

const UpgradeClient = () => {
  return (
    <div className='upgrade-container'>
        <h1 className="upgrade">To watch Movie <Link to="/upgrade-account">Up Grade to Pro</Link></h1>
        <img src="https://pctechguides.com/wp-content/uploads/2016/06/upgrade.jpg" className="upgrade-img"></img>
    </div>
  )
}

export default UpgradeClient