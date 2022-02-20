import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import { CalendarDay } from 'react-bootstrap-icons';
import UpcomingEventsList from "./components/UpcomingEventsList";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = async () => {
    await ApiCalendar.handleAuthClick();
    setIsLoggedIn(true);
  };

  const handleLogOut = async () => {
    await ApiCalendar.handleSignoutClick();
    setIsLoggedIn(false);
  };

  return (
    <div className="container container-calendar">
      <div className="row header-row justify-content-end">
        <div className="col-auto header-col-height align-left">
            <h3 className="header-text">My Calendar</h3>
        </div>
        <div className="col align-left calendar-day"><CalendarDay/>
        </div>
       {isLoggedIn ? (
          <>
              <div className="col-2 header-col-height align-right"> 
                  <p className="header-cell header-text">{`${ApiCalendar.getBasicUserProfile().getName()}`}</p>  
              </div>
              <div className="col-1 header-col-height">
                  <img src={ApiCalendar.getBasicUserProfile().getImageUrl()} alt=""></img>
              </div>
              <div className="col-1 header-col-height">
                  <button className="header-button" onClick={handleLogOut}>Logout</button>
              </div>
              <div className="row justify-content-center row-gutter-0"> 
                <div className="container list-container">
                  <UpcomingEventsList />
                </div>
              </div>
          </>
      ) : (
           <div className="col-1 header-col-height align-right"> 
               <button className="header-button" onClick={handleLogIn}>Login</button>
           </div>
           )}
      </div>
    </div>
  );
}

export default App;