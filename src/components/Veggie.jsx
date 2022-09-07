import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./Popular.css";

export default function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    // To avoid multiple fetching api if it alearedy fetched.
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=ebe47d43aae249dab55959b7d0a2eb06&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      console.log(data);
      setVeggie(data.recipes);
    }
  };

  return (
    <>
      <div className="popWrapper">
        <h3>Our Vegeterian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide className="div1">
                <div className="popCard" key={recipe.id}>
                  <p className="popCardP">{recipe.title}</p>
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
