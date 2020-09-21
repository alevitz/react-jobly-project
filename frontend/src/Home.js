import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import UserContext from "./UserContext";

function Home(){
  const { currentUser } = useContext(UserContext);

return (
<div className="Home">
<div className="container text-center">
<h1 className="mb-4 font-weight-bold">Jobly</h1>
<p>All the jobs in one, convenient place.</p>
{currentUser ? <h3>Welcome Back {currentUser.username}!</h3> : <Link className="btn btn-primary font-weight-bold" to="/login">Log In</Link>}
</div>
</div>)

}

export default Home;