let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"],
      abilities: ["blaze", "solar-power"],
    },
    {
      name: "Arbok",
      height: 3.5,
      types: ["poison"],
      abilities: ["intimidate", "shed-skin", "unnerve"],
    },
    {
      name: "Ninetales",
      height: 1.1,
      types: ["fire"],
      abilities: ["flash-fire", "drought"],
    },
    {
      name: "Magneton",
      height: 1,
      types: ["electric", "steel"],
      abilities: ["sturdy", "magnet-pull", "analytic"],
    },
    {
      name: "Reshiram",
      height: 3.2,
      types: ["dragon", "fire"],
      abilities: ["turboblaze"],
    },
  ];
  return {
    //return the complete array with all Pokemons
    getAll: function () {
      return pokemonList;
    },
    //adds a single entry to the end of the array in case the entry uses valid keys
    add: function (pokemon) {
      if (typeof pokemon === "object") {
        // check whether all keys are included
        const requiredKeys = ["name", "height", "types", "abilities"];
        const keys = Object.keys(pokemon);
        let allKeysIncluded = true;
        keys.forEach((key) => {
          console.log(key, requiredKeys.includes(key));
          if (!requiredKeys.includes(key)) {
            allKeysIncluded = false;
          }
        });
        if (allKeysIncluded) {
          // check whether keys are of the right type
          if (
            typeof pokemon.name === "string" &&
            typeof pokemon.height === "number" &&
            Array.isArray(pokemon.types) &&
            Array.isArray(pokemon.abilities)
          ) {
            pokemonList.push(pokemon);
          }
        }
      }
    },
    //returns the entries with the given name as an array
    findByName: function (searchName) {
      return pokemonList.filter((pokemon) => pokemon.name === searchName);
    },
  };
})();

//display all Pokemons in the list
document.write(`<ul>`);
pokemonRepository.getAll().forEach(function (pokemon, i) {
  if (pokemon.height < 3) {
    document.write(
      `<li>The ${i + 1}. Pokemon, ${pokemon.name}, is ${
        pokemon.height
      } meters tall. </li>`
    );
  } else {
    document.write(
      `<li>The ${i + 1}. Pokemon, ${pokemon.name}, is ${
        pokemon.height
      } meters tall - wow, that's <span class="big">BIG!</span></li>`
    );
  }
});
document.write(`</ul>`);
