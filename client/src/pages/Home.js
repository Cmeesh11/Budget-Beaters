import React from 'react';
import Login from '../components/Login';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div>
      <div className='d-flex justify-content-around'>
        <button className="btn btn-primary"><a className="text-light" href="/">Home</a></button>
        <Login />
      </div>
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
