import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./Popular.css";
export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=ebe47d43aae249dab55959b7d0a2eb06&number=9`
    );
    const data = await api.json();
    console.log(data);
    setPopular(data.recipes);
  };

  return (
    <>
      <div className="popWrapper" >
        <h3>Popular Picks</h3>
        <Splide options={{
          perPage:4,arrows:false,
          pagination:false, drag:'free',gap:"3rem"
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide>
                <div className="popCard" key={recipe.id} >
                  <p className="popCardP" >{recipe.title}</p>
                  <img className="popCardImg" src={recipe.image} alt="" />
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </>
  );
}
