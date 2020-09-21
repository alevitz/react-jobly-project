import React, {useState, useEffect} from 'react';
import CardList from './CardList';
import JoblyApi from './JoblyAPI';
import Search from './Search';


function Companies(){
const [companyList, setCompanyList] = useState([]);

useEffect(() => {
  async function getCompanies() {
    let companies = await JoblyApi.getCompanies();
    setCompanyList(companies);
    
  }
  getCompanies();
}, []);

const handleSearch = async (search) => {
    let companies = await JoblyApi.getCompanies(search);
  
  setCompanyList(companies);
}

return (<div className="container col-md-8">
<Search searchFor={handleSearch}/>
 <CardList cards={companyList}/>
</div>)

}

export default Companies;