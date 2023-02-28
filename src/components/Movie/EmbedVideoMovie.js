import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchUserFromApi } from '../../actions/fireStoreActions';
import { useStore } from '../../stored';

const EmbedVideoMovie = ({ id }) => {
  // const [accountUser, setAccountUser] = useState('basic');
  // const { user } = useStore((state) => state);
  // const userResult = fetchUserFromApi(user.uid);
  // useEffect(() => {
  //   userResult.then(function (result) {
  //     setAccountUser(result.at(0).accountLevel);
  //   });
  // }, []);
  // console.log(accountUser);
  return (
    <div className="watch-movie">
      <iframe
        width="100%"
        height={'100%'}
        // src={accountUser === 'premium' ? `https://www.2embed.to/embed/tmdb/movie?id=${id}` : `/404page`}
        src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
        title="Movie player"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default EmbedVideoMovie;
