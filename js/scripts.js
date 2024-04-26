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
      listElement.classList.add("list-group-item");
      uiList.appendChild(listElement);
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      //adding classes for styling the button
      button.classList.add("btn");
      button.classList.add("btn-primary");
      button.classList.add("btn-custom");
      button.classList.add("pokemon-list--button");
      //adding attributes for toggling the modal
      button.setAttribute("type", "button");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#info-modal");
      listElement.appendChild(button);
      //add event listner to button to fill details of pokemon into modal
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
        pokemonRepository.constructInfoModal(pokemon);
      });
    },
    //returns the entries with the given name as an array
    findByName: function (searchName) {
      return pokemonList.filter((pokemon) => pokemon.name === searchName);
    },
    //highligts the Pokemons that fit the prompt in the search bar
    promptPokemon: () => {
      const searchBox = document.querySelector(".prompt-pokemon");
      const prompt = searchBox.value;
      console.log(prompt);
      const listItems = document.querySelectorAll("#pokemon-list .btn");
      console.log(listItems);
      listItems.forEach((item) => {
        if (item.innerText.includes(prompt)) {
          item.classList.add("highlight");
        } else {
          item.classList.remove("highlight");
        }
        if (!prompt) {
          item.classList.remove("highlight");
        }
        console.log(prompt);
        console.log(item.innerText);
        console.log(prompt === item.innerText);
      });
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
      const infoModal = document.querySelector("#info-modal");
      infoModal.querySelector(".modal-title").innerText = pokemon.name;
      const infoBody = infoModal.querySelector(".modal-body");
      infoBody.innerHTML = "";
      //creates an img tag for the pokemon image and puts in it a list item
      let modalImage = document.createElement("img");
      modalImage.classList.add("modal__pokemon-img");
      modalImage.setAttribute("src", pokemon.imageUrl);
      modalImage.setAttribute("alt", `image of ${pokemon.name}`);
      const modalImageListItem = document.createElement("li");
      modalImageListItem.appendChild(modalImage);
      //creates a list of information about the pokemon
      let infoList = document.createElement("ul");
      infoBody.classList.add("modal__info");
      let heightInfo = document.createElement("li");
      heightInfo.innerText = `Height: ${pokemon.height}`;
      let typesInfo = document.createElement("li");
      typesInfo.innerText = `Types: `;
      pokemon.types.forEach((type) => {
        typeItem = document.createElement("li");
        typeItem.classList.add("pokemon-type");
        typeItem.innerText =
          type.type.name.charAt(0).toUpperCase() +
          type.type.name.substring(1) +
          ", ";
        typesInfo.appendChild(typeItem);
      });
      typesInfo.lastChild.innerHTML = typesInfo.lastChild.innerHTML.slice(
        0,
        -2
      );

      infoList.appendChild(modalImageListItem);
      infoList.appendChild(heightInfo);
      infoList.appendChild(typesInfo);

      infoBody.appendChild(infoList);
    },
  };
})();

//initializes the creation of the pokemon list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//enables the use of the search bar, highlighting Pokemon buttons that fit the prompt
window.addEventListener("keydown", (event) => {
  setTimeout(pokemonRepository.promptPokemon, 10);
});
