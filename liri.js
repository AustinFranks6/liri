require("dotenv").config();

var keys = require("./keys");

var Spotify = require("node-spotify-api");

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);

var getArtistNames = function(artist) {
    return artist.name;
  };
  
  var getMeSpotify = function(songName) {
      
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");
  
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };

var pick = function(caseData, functionData) {
    switch(caseData) {
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
    }
  };

  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  runThis(process.argv[2], process.argv.slice(3).join(" "));