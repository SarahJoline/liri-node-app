require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys);

var convertedUserInput = [];

conversion();

function conversion() {
  let message = "";
  for (let i = 2; i < process.argv.length; i++) {
    if (i != process.argv.length - 1) {
      message += process.argv[i] + "+";
    } else {
      message += process.argv[i];
    }
  }

  convertedUserInput.push(message);
}

//console.log(keys);

getMovie();

function getMovie() {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        convertedUserInput +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Ratings[0].Value);
      console.log(response.data.Ratings[1].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
    });
}
//getBands();
function getBands() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        convertedUserInput +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(response.data[0].datetime);
    });
}
// inquirer
//   .prompt({
//     type: "list",
//     message: "What would you like to do?",
//     choices: ["Concert", "Spotify", "Movie", "Do what it says"],
//     name: "select-command"
//   })
//   .then(res => {
//     console.log("I got lost on a tangent");
//   });

// const concertSearch = () => {
//   inquirer
//     .prompt({
//       type: "input",
//       message: "Enter artist's name here: ",
//       name: "concert"
//     })
//     .then(res => {
//       console.log("concert info");
//     });
// };

// const spotifySearch = () => {
//   inquirer
//     .prompt({
//       type: "input",
//       message: "Enter song name here: ",
//       name: "spotify-search"
//     })
//     .then(res => {
//       console.log("song info");
//     });
// };

// const movieSearch = () => {
//   inquirer
//     .prompt({
//       type: "input",
//       message: "Enter movie name here: ",
//       name: "movie"
//     })
//     .then(res => {
//       console.log("movie info");
//     });
// };

// const command = () => {
//   inquirer
//     .prompt({
//       type: "input",
//       message: "Enter command here: ",
//       name: "command-name"
//     })
//     .then(res => {
//       console.log("command info");
//     });
// };
