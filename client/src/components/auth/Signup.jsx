import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");
  const { signup, setErrors, errors } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username,
      password,
      password_confirmation: passwordConfirmation,
      age,
    })
    fetch("/signup", {
      method: "POST",
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"},
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        age,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/");
        } else {
          const errorLis = user.errors.map((e, index) => <li key={index}>{e}</li>);
          setErrors(errorLis);
        }
      });
      //clear form
      // setUsername("");
      // setPassword("");
      // setPasswordConfirmation("");
      // setAge("");
  };

  useEffect(() => {
    return ()=> {
      setErrors([])
    }
  },[setErrors])
  
  return (
    <div className="container-flex">
      <div className="row justify-content-center">
      <div className="col-lg-6">
        <form className="my-5 justify-content-center text-center bg-dark border-dark p-3" onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="mb-3 input-group">
            <span className="input-group-text">Username</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                aria-label="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="mb-3 input-group">
            <span className="input-group-text">Enter Password</span>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="mb-3 input-group">
            <span className="input-group-text">Password Confirmation</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Password Confirmation"
                aria-label="password_confirmation"
                id="password-confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="mb-3 input-group">
            <span className="input-group-text">Age</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                aria-label="Age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          <button type="submit" className="btn bg-warning p-2 btn-outline-primary fw-bold">
            Sign Up
          </button>
          <div className="text-light">{errors}</div>
        </div>
        </form>
      </div>
      </div>
    </div>
  );
};
export default SignUp;