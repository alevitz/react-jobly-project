import React from 'react';
import Card from './Card';

function CardList({cards = [], apply}){
  
return (<div>
  {cards.map((cardData, idx) => {
    return (<Card 
    item={cardData}
    key={idx}
    idx={idx}
    apply={apply}
    />
  )})}
</div>)

}

export default CardList;