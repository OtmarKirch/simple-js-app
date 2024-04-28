# Simple JavaScript App: Pokedec
## Description
This is a simple JavaScript App. In order to learn the principles of and how to program with JavaScript, I have been building this app. 
You can follow along the development process by inspecting the commit messages and branches of this project.

## Objective
The object was to build a small web application with HTML, CSS, and JavaScript that loads data from an external API and enables the viewing of data points in detail.

## Key Features to be implemented by the end of the project
- Load data from an external source (API)
- View a list of items
- On user action (e.g., by clicking on a list item), view details for that item

## Current State
### Finished
The structure of the project is set up on GitHub in order to continously receive commits. The work has been finished by now.
### Using an API to get Pokemon data
The `script.js`file initializes a repository of Pokemons with an IIEF function. When initialized, data about Pokemons are loaded into a list via API. This data includes the name of the Pokemon and a URL with further information. 
### List of Buttons with Names
The name is used to create buttons automatically via JavaScript using the DOM. The user can click on these buttons to receive further information. 
### Search Bar
The search bar in the navigation section can be used to highlight buttons. Buttons with the name containing the given string change their text color to yellow.
### Display Image and Data
The buttons can be clicked to receive further information about the chosen Pokemon. To fetch that information, the API is used again. Details of the pokemon are now displayed in a modal.
### Bootstrap
Bootstrap is used as the framework. The code has been refactored accordingly.