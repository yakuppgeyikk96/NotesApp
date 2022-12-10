import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchNotes, filter } from '../../redux/notesSlice';
import './style.css';

const DisplayNotes = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { value, filteredValue, loading } = useSelector((state) => state.notes);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch])

  const changeCurrentIndex = (index) => {
    if (index === currentIndex) {
      setCurrentIndex(-1);
    }
    else {
      setCurrentIndex(index);
    }
  }

  useEffect(() => {
    setSearchInput("");
  }, [value])

  const onSearch = (e) => {
    setSearchInput(e.target.value);
    dispatch(filter(e.target.value));
  }

  if (loading) {
    return (
      <div className='display-notes'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className='display-notes'>
      <div className='search'>
        <input
          type="text"
          name='search'
          id='search'
          value={searchInput}
          placeholder='Search...'
          onInput={onSearch}
        />
      </div>
      {filteredValue.length > 0 && (
        <ul>
          {filteredValue.map((note, index) => <li key={note.id} className={`bg-${note.color}`}>
            <div className='item-title' onClick={() => changeCurrentIndex(index)}>
              {note.title}
            </div>
            <div className='item-description'
              style={{
                display: currentIndex !== index ? 'none' : ''
              }}>
              {note.description}
            </div>
          </li>)}
        </ul>
      )}
    </div>
  )
}

export default DisplayNotes;