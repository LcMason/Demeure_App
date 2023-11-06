import React, { useState } from 'react'
import HomePage from "../images/HomePage.jpg"

function getDate() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  const hours = today.getHours() % 12 || 12;
  const minutes = today.getMinutes();
  const ampm = today.getHours() >= 12 ? 'pm' : 'am';
  return `Bronx, NY | ${month}, ${date}, ${year} | ${hours}:${minutes.toString().padStart(2, '0')}${ampm} EST`;
}

const Home = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  const dateStyle = {
    fontSize: '16px'
  };

  return (
    // <div className="containter-fluid">
      <div className="has-bg-img">
        <h2 className="text-center">DEMEURE</h2>
        <p className="text-center" style={dateStyle}>{currentDate}</p>
        <div>
          <div style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${HomePage})`,
            backgroundPosition: "center",
          }} className="bg-img mx-auto"></div>
        </div>
      </div>
    // </div>
  )
}

export default Home;

