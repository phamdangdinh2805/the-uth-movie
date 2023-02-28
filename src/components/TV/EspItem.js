import React from 'react';
import { NavLink } from 'react-router-dom';

const EspItem = ({ esp, id }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      <NavLink
        to={`/watch/tv/${id}/season/${esp.season_number}/esp/${esp.episode_number}`}
        activeclassname="active"
        className="esp-list"
        onClick={scrollToTop}
      >
        <div className="esp-item">
          <div className="esp-item-img">
          </div>
          <div>
            <p className="esp-item-name">Episode {esp.episode_number}</p>
          </div>
        </div>
      </NavLink>
  );
};

export default EspItem;
