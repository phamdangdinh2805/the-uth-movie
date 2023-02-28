import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../utils/constans';
import Title from '../../components/Shared/Title';
import Comment from '../../components/Comments/Comment';
import EmbedVideoMovie from '../../components/Movie/EmbedVideoMovie';
import MovieInfo from '../../components/Movie/MovieInfo';
import './Watch.css';
import { useStore } from '../../stored';
import { fetchUserFromApi } from '../../actions/fireStoreActions';
import UpgradeClient from '../../components/UpgradeClient/UpgradeClient';
import RequireUserLogin from '../../components/RequireUserLogin/RequireUserLogin';

function WatchMovie() {
  const params = useParams();
  const [info, setInfo] = useState({});
  const { id } = params;
  const [accountUser, setAccountUser] = useState('basic');
  const { user } = useStore((state) => state);

  useEffect(() => {
    if (user) {
      const userResult = fetchUserFromApi(user.uid);
      userResult.then(function (result) {
        setAccountUser(result.at(0).accountLevel);
      });
    }
  }, []);
  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, [id]);

  return (
    <div className="container">
      <Title title={`${info?.title} `} />

      <div className="watch-movie-container">
        <div className="watch-wrap">
          {user ? [accountUser === 'premium' ? <EmbedVideoMovie id={id} /> : <UpgradeClient />] : <RequireUserLogin />}
          <MovieInfo info={info} />
          <Comment movieId={id} />
        </div>
      </div>
    </div>
  );
}

export default WatchMovie;
