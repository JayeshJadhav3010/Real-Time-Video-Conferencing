import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import LandingPage from './landing'
import Authentication from './authentication';
import { AuthProvider } from './AuthContext';
import VideoMeetComponent from './videoMeet';
import HomeComponent from './home';
import History from './history';
import withAuth from './withAuth';

function App() {

  return (
    <>
      <div className='App'>
        <Router>

          <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>

          <Route path='/auth' element={<Authentication/>}/>

          <Route path='/home' element={<HomeComponent/>}/>
          {/* <Route path='/home' element={<withAuth><HomeComponent/></withAuth>} /> */}

          <Route path='/history' element={<History />} />

          <Route path='/:url' element={<VideoMeetComponent/>}/>

        </Routes>
        
        </AuthProvider>
      </Router>
      </div>
    </>
  )
}

export default App
