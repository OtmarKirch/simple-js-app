let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //gets the list of pokemon from the API
  function loadList() {
    return fetch(apiUrl, { method: "get" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name.charAt(0).toUpperCase() + item.name.substring(1),
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //accesses the details of the pokemon and adds some to the pokemon object
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url, { method: "get" })
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //create all the functions that are returned with the initialisation of the pokemonRepository
  return {
    //return the complete array with all Pokemons
    getAll: function () {
      return pokemonList;
    },
    //adds a single entry to the end of the array in case the entry uses valid keys
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    //add a button of a given pokemon to the button list
    addListItem: function (pokemon) {
      let uiList = document.querySelector(".pokemon-list");
      let listElement = document.createElement("li");
      uiList.appendChild(listElement);
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-list--button");
      listElement.appendChild(button);
      //add event listner to button to log details of pokemon in console
      pokemonRepository.addClickEvent(button, pokemon);
    },
    //Adds an event listener to the button
    addClickEvent: function (button, pokemon) {
      button.addEventListener("click", () => {
        pokemonRepository.showDetails(pokemon);
      });
    },
    //log details of pokemon in console
    showDetails: function (pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    },
    //returns the entries with the given name as an array
    findByName: function (searchName) {
      return pokemonList.filter((pokemon) => pokemon.name === searchName);
    },
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.loadDetails(pokemon);
  });
});

//pokemonRepository.loadDetails()

console.log(pokemonRepository.getAll());

//display all Pokemons in the list
/*
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
*/
