import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../../redux/notesSlice';
import './style.css';

const colors = ["pink", "palegoldenrod", "greenyellow", "lightblue", "lightgreen"];

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("pink");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notes);

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
      const note = {
        title,
        description,
        color
      };

      dispatch(createNote(note));

      setTitle("");
      setDescription("");
      setColor("pink");
    }
  }

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  }

  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  }

  return (
    <div className='add-note'>
      <form className='form' onSubmit={onFormSubmit}>
        <div className='form-item'>
          <input
            type="text"
            name="title"
            id="title"
            placeholder='Enter title...'
            value={title}
            onInput={onTitleChanged}
          />
        </div>
        <div className='form-item'>
          <textarea
            id="description"
            name="description"
            cols="30" rows="10"
            placeholder='Enter description...'
            value={description}
            onInput={onDescriptionChanged}>
          </textarea>
        </div>
        <div className='form-item colors'>
          {colors.map((val, index) => (
            <input key={index} type="radio"
              name="color" id={val} value={val}
              checked={val === color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                backgroundColor: val
              }}
            />
          ))}
        </div>
        <div className='form-btn'>
          <button type="submit" disabled={loading}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote;