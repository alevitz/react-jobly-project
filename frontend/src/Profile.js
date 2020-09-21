import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './JoblyAPI';
import UserContext from "./UserContext";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [input, setInput] = useState({
    first_name: currentUser.first_name || "",
    last_name: currentUser.last_name || "",
    email: currentUser.email || "",
    photo_url: currentUser.photo_url || "",
    password: "",
    errors: []
  });

  const handleChange = (evt) => {
    const {name, value} = (evt.target);
    setInput(input => ({
      ...input,
      [name]: value,
      errors: []
    })
    );
  }

  const submitForm = async (evt) => {
    evt.preventDefault();

    if(input.password.length === 0){
      alert("Password required");
      return;
    }

    try {
      const formData = {
        first_name: input.first_name || undefined,
        last_name: input.last_name || undefined,
        email: input.email || undefined,
        photo_url: input.photo_url || undefined,
        password: input.password
      }

      const result = await JoblyApi.updateUser(currentUser.username, formData);
      
      setInput(input => ({
        ...input,
        errors: [],
        password: ""
      }));
      setCurrentUser(result);
      alert("Updated user information");
    } catch (errors) {
      setInput(f => ({ ...f, errors }))
    }
  }


  return (
    <div className="container col-md-6">
    <h1>Profile</h1>
  <div className="card">
    <div className="card-body">
    <div>
    <form>
    <div className="form-group">
      <label>Username</label>
      <p>{currentUser.username}</p>
      </div>
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
      <div className="form-group">
      <label>Photo URL</label>
      <input
      className="form-control"
        name="photo_url"
        onChange={handleChange}
        value={input.photo_url}
      ></input>
      </div>
      <div className="form-group">
      <label>Re-enter Password</label>
      <input
      className="form-control"
        name="password"
        onChange={handleChange}
        value={input.password}
        type="password"
      ></input>
      </div>
      <button className="btn btn-primary float-right" onClick={submitForm} type="submit">Save Changes</button>
      </form>
    </div>
    </div>
  </div>
  </div>)

}

export default Profile;