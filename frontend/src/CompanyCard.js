import React from 'react';
import {Link} from 'react-router-dom';
import './Card.css';

function CompanyCard({item}){
  return (  <Link className="Card card" to={"/companies/" + item.handle}>
<div className="card-body">
<h6 className="d-flex justify-content-between"><span className="text-capitalize">{item.name}</span></h6>
<p>{item.description}</p>
</div>
</Link>
)
}

export default CompanyCard;