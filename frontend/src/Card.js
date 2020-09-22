import React from 'react';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';

function Card({ item, apply, idx }) {
  if (item.handle) {
    return <CompanyCard item={item} />
  } else {
    return <JobCard item={item} apply={apply} idx={idx} />
  }
}

export default Card;