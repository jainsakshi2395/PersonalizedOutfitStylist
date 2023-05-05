import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Recommend from './pages/Recommend';
import Details from './pages/Details';
import NewUser from './pages/NewUser';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { Auth } from 'aws-amplify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkAuthState();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router forceRefresh={true}>
        <Navbar />
        {isLoggedIn ? (
              <Routes>
              {/* @TODO - change to the right components when other components are ready. */}
                <Route exact path='/' element={<Home />}/>
                {/* <Route exact path='/home' element={<Home />}/> */}
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/recommend' element={<Recommend />} />
                <Route exact path='/details' element={<Details />} />
                <Route exact path='/newuser' element={<Register />} />
              </Routes>
            ) : (
              <Routes>
              {/* @TODO - change to the right components when other components are ready. */}
                <Route exact path='/' element={<NewUser />}/>
                {/* <Route exact path='/home' element={<NewUser />}/> */}
                <Route exact path='/register' element={<NewUser />} />
                <Route exact path='/recommend' element={<NewUser />} />
                <Route exact path='/details' element={<NewUser />} />
                <Route exact path='/newuser' element={<NewUser />} />
              </Routes>
            )}
          </Router>
      </div>
    </Provider>
  );
}

export default App;
