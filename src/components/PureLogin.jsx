import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import UpcomingEventsList from "./UpcomingEventsList";

function PureLogin() {
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
    <>
      {isLoggedIn ? (
        <span>
          <button onClick={handleLogOut}>Logout</button>
          <p>{`${ApiCalendar.getBasicUserProfile().getName()}`}<img src={ApiCalendar.getBasicUserProfile().getImageUrl()} alt=""></img></p>
          <UpcomingEventsList />
        </span>
      ) : (
        <button onClick={handleLogIn}>Login</button>
      )}
    </>
  );
}

export default PureLogin;
