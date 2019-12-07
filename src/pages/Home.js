import React from "react";
import CocktailList from "../components/CocktailList";
export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("a");
  const [cocktails, setCocktails] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
      .then(response => response.json())
      .then(({ drinks }) => {
        const newCocktails = drinks.map(item => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass
          } = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          };
        });
        setCocktails(newCocktails);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [searchTerm]);
  return (
    <main>
      <CocktailList cocktails={cocktails} loading={loading} />
    </main>
  );
}
