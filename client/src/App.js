import './App.css';
import AddNote from './components/add-note';
import DisplayNotes from './components/display-notes';

function App() {
  return (
    <div className='App'>
      <AddNote />
      <DisplayNotes />
    </div>
  );
}

export default App;
