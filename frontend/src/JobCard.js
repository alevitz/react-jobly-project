import React from 'react';
import './Card.css';

function JobCard({ item, apply, idx }) {
  return (<div className="Card card">
    <div className="card-body">
      <h6 className="card-title d-flex">{item.title}</h6>
      <div>Salary: {item.salary}</div>
      <div>Equity: {item.equity}</div>
      {item.state ? <button className="btn btn-danger float-right justify-content-between" disabled>Applied</button> : <button className="btn btn-danger float-right" onClick={() => apply(idx)}>Apply</button>}
    </div>
  </div>)
}

export default JobCard;