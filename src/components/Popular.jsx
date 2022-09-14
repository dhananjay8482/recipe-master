import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./Popular.css";
import {Link} from 'react-router-dom';
export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    // To avoid multiple fetching api if it alearedy fetched.
    const check = localStorage.getItem('popular');

    if (check){
      setPopular(JSON.parse(check));
    }else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=ebe47d43aae249dab55959b7d0a2eb06&number=9`
      );
      const data = await api.json();
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      console.log(data);
      setPopular(data.recipes);
      
    }

  };

  return (
    <>
      <div style={{'marginTop':-90}} className="popWrapper" >
        <h3  >Popular Picks</h3>
        <Splide options={{
          perPage:4,arrows:false,
          pagination:false, drag:'free',gap:"2rem"
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide className="div1" >
                <div className="popCard" key={recipe.id} >
                  <Link to={'/recipe/'+recipe.id} >
                  <p className="popCardP" >{recipe.title}</p>
                  <img className="popCardImg" src={recipe.image} alt="" />
                  </Link>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </>
  );
}
