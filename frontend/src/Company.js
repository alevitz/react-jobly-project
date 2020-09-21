import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import Cardlist from './CardList';
import UserContext from "./UserContext";

function Company() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [userJobIds, setUserJobIds] = useState(currentUser.jobs ? currentUser.jobs.map(job => job.id) : []);

  useEffect(() => {
    async function getCompany() {
      const result = await JoblyApi.getCompany(handle);

      for (let job of result.jobs) {
        if (userJobIds.includes(job.id)) {
          job.state = "Applied";
        } else {
          job.state = null;
        }
      }
      setCompany(result);
    }
    getCompany();
  }, []);


  const apply = async (idx) => {

    const jobId = company.jobs[idx].id;

    const message = await JoblyApi.apply(jobId);

    const updatedCompany = { ...company }
    updatedCompany.jobs[idx].state = message
    setCompany(updatedCompany);

    const updatedCurrentUser = { ...currentUser };
    updatedCurrentUser.jobs.push(company.jobs[idx]);
    setCurrentUser(updatedCurrentUser);
  }

  return (
    <div>
      {!company ? <h2>Loading...</h2> : <div className="container col-md-8">
        <h5>{company.name}</h5>
        <p>{company.description}</p>
        <Cardlist cards={company.jobs} apply={apply} />
      </div>}
    </div>)

}

export default Company;