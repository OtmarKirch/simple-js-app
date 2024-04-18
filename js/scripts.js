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

const pokemonListLength = pokemonList.length;

//display all Pokemons in the list
document.write(`<ul>`);
pokemonList.forEach(function(pokemon, i){
  //const selPokemon = pokemonList[i];
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
})
document.write(`</ul>`);
