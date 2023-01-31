import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Todolist />
    </div>
  );
}

function Todolist() {
  return (
      <div>
        <h3>What to learn</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={true}/><span>CSS & HTML</span></li>
          <li><input type="checkbox" checked={true}/><span>CSS & HTML</span></li>
          <li><input type="checkbox" checked={true}/><span>CSS & HTML</span></li>
        </ul>
      </div>
  )
}

export default App;
