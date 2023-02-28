import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Shared/Title';
import { FaSearch } from 'react-icons/fa';
import Tippy from '@tippyjs/react/headless';
import ListResults from '../../components/Result/ListResults';
import { API_KEY, BASE_URL } from '../../utils/constans';
import './Search.css';

function Search() {
  const [keyWord, setKeyWord] = useState('');
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setKeyWord(e.target.value);
    const value = e.target.value;

    if (!value.trim()) return setResults([]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        setLoading(true);
        fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${value}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data.results);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }, 500);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (keyWord.trim() === '') return;

    navigate(`/results?q=${keyWord}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={onSubmitForm} className="search">
        <Title title={'Search movies and tv-shows'} />
        <Tippy
          interactive
          placement="bottom-start"
          render={(attrs) => <ListResults keyWord={keyWord} loading={loading} results={result} {...attrs} />}
          visible={result.length > 0}
        >
          <div className="search-input">
            <FaSearch className="search-submit" type="submit" />
            <input
              onChange={onChangeInput}
              value={keyWord}
              placeholder="Search movies..."
              className="search-text"
              type="text"
            />
          </div>
        </Tippy>
      </form>
    </div>
  );
}

export default Search;
