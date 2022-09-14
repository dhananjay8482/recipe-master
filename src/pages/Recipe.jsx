import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button } from "bootstrap";

export default function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=ebe47d43aae249dab55959b7d0a2eb06`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Buttons
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Buttons>
        <Buttons
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Buttons>

        {activeTab === "instructions" && (
          <div style={{ marginTop: "5%" }}>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <br />
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}

        
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  margin-right: 0%;
  display: flex;
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img {
    width: 30rem;
  }
`;

const Buttons = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 3rem;
`;
