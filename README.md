# Simple JavaScript App
## Description
This is a simple JavaScript App in development. In order to learn the principles of and how to program with JavaScript, I am building this app. This is work in progress. There is no functionality implemented yet.

## Objective
To build a small web application with HTML, CSS, and JavaScript that loads data from an external API and enables the viewing of data points in detail.

## Key Features to be implemented by the end of the project
- Load data from an external source (API)
- View a list of items
- On user action (e.g., by clicking on a list item), view details for that item

## Current State
### Work in Progress
The structure of the project is set up on GitHub in order to continously receive commits.
### Using an API to get Pokemon data
A list of Pokemons is loaded into the `script.js`file with an API. This data includes the name of the Pokemon and a URL with further information. 
### List of Buttons to Display Image and Data
The name is used to create buttons automatically via JavaScript using the DOM. The user can click on these buttons to receive further information. To fetch that information, the API is used again. Details of the pokemon are now displayed in a modal.
### Search Bar
The search bar in the navigation section can be used to highlight buttons. Buttons with the name containing the given string change their text color to yellow.
### Bootstrap
Bootstrap is used as the framework. The code has been refactored accordingly.