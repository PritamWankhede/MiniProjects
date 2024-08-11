import React, { useState, useEffect } from 'react';
import Styles from './ContactKeeper.module.css';
import { data } from './data';

const ContactKeeper = () => {
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const recPerPage = 10;
  const numberOfPages = Math.ceil(data.length / recPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  
  const filteredData = data.filter((item) => 
    search.toLowerCase() === '' ? true : item.first_name.toLowerCase().includes(search.toLowerCase())
  );

 
  const lastIndex = currPage * recPerPage;
  const firstIndex = lastIndex - recPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);

  const getPrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  const getNextPage = () => {
    if (currPage < numberOfPages) {
      setCurrPage(currPage + 1);
    }
  };

  const setPage = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  useEffect(() => {
    setCurrPage(1);
  }, [search]);

  return (
    <div className={Styles.container}>
      <h1 className={Styles.tittle}>ContactKeeper</h1>

      <div className={Styles.inputsection}>
        <input
          placeholder='Search Contacts......'
          type='text'
          className={Styles.searchperson}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={Styles.button}><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>

      <table className={Styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, id) => (
            <tr key={id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={Styles.bottombutton}>
        <button className={Styles.prevbutton} onClick={getPrevPage} disabled={currPage === 1}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className={Styles.pagination}>
          {numbers.map((number, index) => (
            <button
              key={index}
              className={`${Styles.pageNumber} ${currPage === number ? Styles.highlighted : ''}`}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <button className={Styles.nextbutton} onClick={getNextPage} disabled={currPage === numberOfPages}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactKeeper;
