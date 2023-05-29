// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/players", (req, res) => {
  const playersList = readJSONFile();
  const newPlayer = req.body;
  newPlayer.id = uuid.v4.apply();
  playersList.push(newPlayer);
  writeJSONFile(playersList);
  res.status(200).send(newPlayer);
});

// Read One
app.get("/players/:id", (req, res) => {
  const playersList = readJSONFile();
  const id = req.params.id;
  let foundDog = null;
  playersList.forEach(player => {
    if (player.id === id) {
        foundPlayer = player;
    }
  })
  if (foundPlayer === null) {
    res.status(204).send('No player found!');
  } else {
    res.status(200).send(foundPlayer);
  }
});

// Read All
app.get("/players", (req, res) => {
  const playersList = readJSONFile();
  if(playersList != undefined && playersList.length != 0) {
    res.status(200).send(playersList);
  } else {
    res.status(204).send('No players found!');
  }
});

// Update
app.put("/players/:id", (req, res) => {
  const playersList = readJSONFile();
  const id = req.params.id;
  const update = req.body;
  let playerToUpdate = null;
  for (let i = 0; i < playersList.length; i++) {
    if (playersList[i].id === id) {
        if (update.name) {
            playersList[i].name = update.name;
        }

        if (update.img) {
            playersList[i].img = update.img;
        }

        playerToUpdate = playersList[i];
        break;
    }
  }
  writeJSONFile(playersList);
  if (playerToUpdate === null) {
    res.status(204).send('No player found!')
  } else {
    res.status(200).send(playerToUpdate);
  }
});

// Delete
app.delete("/players/:id", (req, res) => {
  const playersList = readJSONFile();
  const id = req.params.id;
  let check = false;
  for(let i = 0; i < playersList.length; i++) {
    if(playersList[i].id === id) {
        check = true;
        playersList.splice(i, 1);
        break;
    }
  }
  writeJSONFile(playersList);
  if (check === true) {
    res.status(200).send('Player deleted!');
  } else {
    res.status(204).send('No player found!');
  }
});

// Reading function from db.json file
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["players"];
}

// Writing function from db.json file
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ players: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);