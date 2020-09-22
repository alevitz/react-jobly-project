import React, { useState, useEffect, useContext } from 'react';
import CardList from './CardList';
import JoblyApi from './JoblyAPI';
import Search from './Search';
import UserContext from "./UserContext";

function Jobs() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  const handleSearch = async (search) => {
    let jobs = await JoblyApi.getJobs(search);

    setJobs(jobs);
  }

  const apply = async (idx) => {


    const jobId = jobs[idx].id;

    const message = await JoblyApi.apply(jobId);

    const updatedJobsList = [...jobs];
    updatedJobsList[idx].state = message;

    setJobs(updatedJobsList)


    const updatedCurrentUser = { ...currentUser };
    updatedCurrentUser.jobs.push(jobs[idx]);
    setCurrentUser(updatedCurrentUser);

  }

  return (<div className="container col-md-8">
    <Search searchFor={handleSearch} />
    <CardList cards={jobs} apply={apply} />
  </div>)

}

export default Jobs;