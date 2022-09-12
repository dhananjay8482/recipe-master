import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function Searched() {

  const[ searchedRecipes, setSearchedRecipes ] = useState([]); 
  let params = useParams();


  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=ebe47d43aae249dab55959b7d0a2eb06&query=${name}`
    );
    const recipies = await data.json();
    setSearchedRecipes(recipies.results);
  };

  useEffect(()=>{
    getSearched(params.search);
  },[params.search]);


  return <Grid className="popCard" >
    {searchedRecipes.map(item=>{
      return(
        <Card key={item.id} >
          <img src={item.image} alt="" />
          <h4>{item.title}</h4>
        </Card>
      )
    })}
  </Grid>;
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 2fr));
  grid-gap:3rem;

`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`
