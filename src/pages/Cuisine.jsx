import React, {useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../components/Popular.css";

export default function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=ebe47d43aae249dab55959b7d0a2eb06&cuisine=${name}`
    );
    const recipies = await data.json();
    setCuisine(recipies.results);
    console.log(cuisine)
  };

  useEffect(()=>{
    getCuisine(params.type)
    console.log(params)
  },[params.type])

  return <Grid className="popCard" >
    {cuisine.map(item=>{
      return(
        <Card key={item.id} >
          <Link to={'/recipe/'+item.id} >
          <img src={item.image} alt="" />
          <h4>{item.title}</h4>
          </Link>
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
