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
    //add a button of a given pokemon to the button list
    addListItem: function (pokemon) {
      let uiList = document.querySelector(".pokemon-list");
      let listElement = document.createElement("li");
      uiList.appendChild(listElement);
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-list--button");
      //add event listner to button to log details of pokemon in console
      this.addClickEvent(button, pokemon)
      listElement.appendChild(button);
    },
    //Adds an event listener to the button
    addClickEvent: function (button, pokemon) {
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    },
    //log details of pokemon in console
    showDetails: function (pokemon) {
      console.log(pokemon);
    },
    //returns the entries with the given name as an array
    findByName: function (searchName) {
      return pokemonList.filter((pokemon) => pokemon.name === searchName);
    },
  };
})();

//display all Pokemons in the list

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
