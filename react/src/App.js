import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Recommend from './pages/Recommend';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
        {/* @TODO - change to the right components when other components are ready. */}
          <Route exact path='/' element={<Upload />}/>
          <Route exact path='/home' element={<Register />}/>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/upload' element={<Upload />} />
          <Route exact path='/recommend' element={<Recommend />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
