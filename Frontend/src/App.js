import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddStudent from './pages/addStudent';
import AllPStudent from './pages/allStudents';


function App() {

  return (
    <div className='my-10 mx-10'>

      <Router>
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<AddStudent />} />
          <Route path="/" element={<AllPStudent />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
