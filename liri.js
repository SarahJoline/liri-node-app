require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var read = require("read-file");

var convertedUserInput = [];

function readtext() {
  read("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    var text = data.split(",");
    for (var i = 0; i < text.length; i++) {
      console.log(text[i]);
    }
  });
}

function getMovie() {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        convertedUserInput +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("Movie Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
}

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

function searchSpotify() {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify.search({ type: "track", query: convertedUserInput }, function(
    err,
    data
  ) {
    if (err) throw err;

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("URL: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

inquirer
  .prompt({
    type: "list",
    message: "What would you like to do?",
    choices: ["Concert", "Spotify", "Movie", "Do what it says"],
    name: "selectCommand"
  })
  .then(res => {
    res.selectCommand === "Concert"
      ? concertSearch()
      : res.selectCommand === "Spotify"
      ? spotifySearch()
      : res.selectCommand === "Movie"
      ? movieSearch()
      : res.selectCommand === "Do what it says"
      ? readtext()
      : process.exit();
  });

function concertSearch() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter artist's name here: ",
      name: "concert"
    })
    .then(res => {
      var str = res.concert;
      var replaced = str.split(" ").join("+");
      console.log(replaced);
      convertedUserInput.push(replaced);
      getBands();
    });
}

const spotifySearch = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter song name here: ",
      name: "spotifySearch"
    })
    .then(res => {
      convertedUserInput.push(res.spotifySearch);
      searchSpotify();
    });
};

const movieSearch = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter movie name here: ",
      name: "movie"
    })
    .then(res => {
      var str = res.movie;
      var replaced = str.split(" ").join("+");
      convertedUserInput.push(replaced);
      getMovie();
    });
};
