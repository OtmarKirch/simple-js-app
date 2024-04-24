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
      loadDetails(pokemon)
        .then(function () {
          pokemonRepository.showLoadingMessage();
          console.log(pokemon.types[0].type.name)
          pokemonRepository.constructInfoModal(pokemon);
          let modalContainer = document.querySelector(".modal-container");
          //setTimout only for experiencing the loading message
          new Promise((resolve, reject)=>{
            setTimeout(()=>{
              modalContainer.classList.add("is-visible");
              resolve("Loaded successfully")
            }, 2000)
          }).then((message) => {
          console.log(message)
          setTimeout(() => pokemonRepository.hideLoadingMessage(), 1000);
        });
          
        })
        
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
    constructInfoModal: (pokemon) => {
      let modal = document.querySelector(".modal");
      modal.innerHTML = "";
      let modalHeader = document.createElement("h2");
      modalHeader.innerText = pokemon.name;
      modalHeader.classList.add("modal__header");
      //creates an img tag for the pokemon image
      let modalImage = document.createElement("img");
      //modalImage.innerHTML = `<img class='modal__pokemon-img' src=${pokemon.imageUrl} alt='image of pokemon' />`;
      modalImage.classList.add('modal__pokemon-img')
      modalImage.setAttribute("src", pokemon.imageUrl)
      modalImage.setAttribute("alt", `image of ${pokemon.name}`)
      //creates a list for the information about the pokemon
      let modalInfo = document.createElement("ul");
      modalInfo.classList.add("modal__info");
      let heightInfo = document.createElement("li");
      heightInfo.innerText = `Height: ${pokemon.height}`;
      let typesInfo = document.createElement("li");
      typesInfo.innerText = `Types: `;
      pokemon.types.forEach((type) => {
        typeItem = document.createElement("li");
        typeItem.classList.add("pokemon-type");
        typeItem.innerText = type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1) + ", "
        typesInfo.appendChild(typeItem);
      });
      typesInfo.lastChild.innerHTML = typesInfo.lastChild.innerHTML.slice(0, -2);
      modalInfo.appendChild(heightInfo);
      modalInfo.appendChild(typesInfo);
      let modalExit = document.createElement("button");
      modalExit.innerText = "Get Back";
      modalExit.classList.add("modal__closing-button");
      modalExit.addEventListener("click", () => {
        document.querySelector(".modal-container").classList.remove("is-visible");
      });
      //append all elements of the modal to the modal div
      modal.appendChild(modalHeader);
      modal.appendChild(modalImage);
      modal.appendChild(modalInfo);
      modal.appendChild(modalExit);
      
    },
  };
})();

//initializes the creation of the pokemon list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//adds an event listener to close the modal by pressing ESC
window.addEventListener("keydown", (event)=>{
  let modal = document.querySelector(".modal-container");
  if (event.key === "Escape" && modal.classList.contains("is-visible")){
    modal.classList.remove("is-visible");
  }
})
