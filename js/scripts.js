let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //gets the list of pokemon from the API
  function loadList() {
    pokemonRepository.showLoadingMessage();
    window.showL;
    return fetch(apiUrl, { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        pokemonRepository.hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name.charAt(0).toUpperCase() + item.name.substring(1),
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon);
        });
      })
      .catch(function (e) {
        pokemonRepository.hideLoadingMessage();
        console.error(e);
      });
  }

  //accesses the details of the pokemon and adds some to the pokemon object
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url, { method: "GET" })
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
        console.log("Loading");
        pokemonRepository.showLoadingMessage();
        let modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("is-visible")
        console.log(pokemon.imageUrl, pokemon.height, pokemon.types);
      }).then(()=>{
        //setTimout only for experiencing the loading message
        setTimeout(() => pokemonRepository.hideLoadingMessage(), 1000)
        });
    },
    //returns the entries with the given name as an array
    findByName: function (searchName) {
      return pokemonList.filter((pokemon) => pokemon.name === searchName);
    },
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: () => {
      const loadingMessage = document.querySelector(".loading");
      loadingMessage.classList.remove("hide");
    },
    hideLoadingMessage: () => {
      const loadingMessage = document.querySelector(".loading");
      loadingMessage.classList.add("hide");
    },
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


//event listener to close modal. Will be removed with further implementation of the modal
let modalContainerHide = document.querySelector(".modal-container")
let buttonClose = document.querySelector(".closing-button")
buttonClose.addEventListener("click", ()=>{
  modalContainerHide.classList.remove("is-visible")
})
