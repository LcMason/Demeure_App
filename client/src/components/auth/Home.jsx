import React from 'react'
import HomePage from "../images/HomePage.jpg"

const Home = () => {
  return (
    <div className="containter-fluid">
      <div className="has-bg-img">
        <h2 className="text-center">DEMEURE</h2>
        <h4 className="text-center">It's easy to set background image with Torus Kit</h4>
        <div>
          <div style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${HomePage})`,
            backgroundPosition: "center",
          }} className="bg-img mx-auto"></div>

        </div>
        {/* <img style={{height: "100vh"}} className="bg-img mx-auto img-fluid" src={HomePage}alt={HomePage}/> */}
      </div>

    </div>
  )
}

export default Home;