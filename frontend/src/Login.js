import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import JoblyApi from './JoblyAPI';

function Login({ setToken }) {
  const history = useHistory();
  const [activeView, setActiveView] = useState("login");
  const [inputErrors, setInputErrors] = useState([]);
  const [input, setInput] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  });

  const formData = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  }


  const handleChange = (evt) => {
    const inputField = (evt.target.name);
    setInput({
      ...input,
      [inputField]: evt.target.value
    }
    );
    setInputErrors([]);
  }

  const setLoginView = () => {
    setActiveView("login");
    setInputErrors([]);
  }

  const setSignUpView = () => {
    setActiveView("signup");
    setInputErrors([]);
  }

  const submitForm = async (evt) => {
    evt.preventDefault();

    try {
      if (activeView === "login") {

        const token = await JoblyApi.login(input);

        localStorage.setItem("jobly-token", token);
        setInput(formData);
        setToken(token);
        history.push("/jobs");

      } else {

        const token = await JoblyApi.register(input);
        localStorage.setItem("jobly-token", token);
        setInput(formData);
        setToken(token);
        history.push("/jobs");

      }

    } catch (errors) {
      return setInputErrors([errors[0]]);
    }
  }

  const signUpFields = (

    <div>
      <div className="form-group">
        <label>First Name</label>
        <input
          className="form-control"
          name="first_name"
          onChange={handleChange}
          value={input.first_name}>
        </input>
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          className="form-control"
          name="last_name"
          onChange={handleChange}
          value={input.last_name}
        ></input>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          onChange={handleChange}
          value={input.email}
        ></input>
      </div>
    </div>
  )

  return (<div className="container col-md-6">
    <div className="d-flex justify-content-end">
      <div className="btn-group">
        <button className={`btn btn-primary ${activeView === "login" ? "active" : ""}`} onClick={setLoginView}>Login</button>
        <button className={`btn btn-primary ${activeView !== "login" ? "active" : ""}`} onClick={setSignUpView}>Sign Up</button>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label> Username</label>
            <input
              className="form-control"
              name="username"
              onChange={handleChange}
              value={input.username}
            ></input>
          </div>
          <div className="form-group">
            <label> Password</label>
            <input
              className="form-control"
              name="password"
              onChange={handleChange}
              value={input.password}
              type="password"
            ></input>
          </div>
          {activeView === "login" ? null : signUpFields}
          {inputErrors.length ? <div className="alert alert-danger" role="alert">
            {inputErrors[0]}</div> : null}
          <button className="btn btn-primary float-right" onClick={submitForm} type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>)

}

export default Login;