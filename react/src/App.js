import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Recommend from './pages/Recommend';
import Details from './pages/Details';
import NewUser from './pages/NewUser';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        <Navbar />
          <Routes>
          {/* @TODO - change to the right components when other components are ready. */}
            <Route exact path='/' element={<Upload />}/>
            <Route exact path='/home' element={<Register />}/>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/recommend' element={<Recommend />} />
            <Route exact path='/details' element={<Details />} />
            <Route exact path='/newuser' element={<NewUser />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
