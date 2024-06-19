import "./App.css";
import { useState } from "react";
//map states:
//0 => empty/unoccupied
//1 => white team
//2 => black team

//how the game works:
//rules for any gamestate:
//1. if a player gets 3 bricks in a straight horizontal or vertical row, they make what is called a wall.
//   once a player has made a wall, they can remove one of the other players bricks from the board before their turn ends
//2. a brick that is part of a wall is considered "walled" and cannot be removed from the board so long as it stays "walled"
//3. if a brick that is part of a wall is moved such that the wall is no longer formed, it and the other bricks that made
//   up the wall are no longer "walled"
//4. a brick can only be placed or moved on an unoccupied spot

//pregame:
//players take turn placing one of their 9 total reserve bricks onto the board

//midgame:
//players must now choose a brick to move and may only move it to a connected spot on the map (only moved to where the paths lead)
//a brick can only be moved one spot at a time, and moving a brick takes a turn.

//endgame:
//once a player only has 3 bricks left, they can move their bricks anywhere that is unoccupied on the map, this only applies to 
//the player with 3 bricks left, and can apply to both players if both only have 3 bricks left.

//win condition: the first player to get the enemy players brick count to 2 wins. That is to say if you only have 2 bricks left, you lose

const spotSpots = [
  //fuck making an algorithm for this shit bruh, its the same for all layers
  ["0%", "0%"],
  ["50%", "0%"],
  ["100%", "0%"],
  ["100%", "50%"],
  ["100%", "100%"],
  ["50%", "100%"],
  ["0%", "100%"],
  ["0%", "50%"],
];
const layerAmount = 3;

function generateMap(layers) {
  let map = [];
  for (let i = 0; i < layers; i++) {
    let layer = new Array(8).fill(0);
    map.push(layer);
  }
  return map;
}

let wallList = [[],[]];
function wallCheck(brickDiv, map) {
  let [layer, spot] = brickDiv.target.id.split("-");
  let spotLoopList = [6,7,0,1,2,3,4,5,6,7,0]  //connects the list into circle

  let foundNewWall = false;
  if (spot % 2 === 1) {
    //checking interdimensional walls
    let outerTeam = map[0][spot];
    let middleTeam = map[1][spot];
    let innerTeam = map[2][spot];

    if (
      outerTeam !== 0 &&
      outerTeam === middleTeam &&
      middleTeam === innerTeam
    ) {
      wallList[playing-1].push([
        `0-${spot}-${map[0][spot]}`,
        `1-${spot}-${map[1][spot]}`,
        `2-${spot}-${map[2][spot]}`,
      ]);
      console.log("wall found 1", wallList);
      foundNewWall = true;
    }
    spot = parseInt(spot) + 2

    //checking same dimensional walls
    let leftTeam = map[layer][spotLoopList[(spot - 1)]];
    let selfTeam = map[layer][spotLoopList[spot]];
    let rightTeam = map[layer][spotLoopList[(spot + 1)]];

    if (leftTeam !== 0 && leftTeam === selfTeam && selfTeam === rightTeam) {
      wallList[playing-1].push([
        `${layer}-${spotLoopList[spot - 1]}-${map[layer][spotLoopList[spot - 1]]}`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
        `${layer}-${spotLoopList[spot + 1]}-${map[layer][spotLoopList[spot + 1]]}`,
      ]);
      console.log("wall found 2", wallList);
      foundNewWall = true;
    } 
  }
  else {
    spot = parseInt(spot) + 2 
    let leftTeam1 = map[layer][spotLoopList[spot - 2]]
    let middleTeam1 = map[layer][spotLoopList[spot - 1]]
    let selfTeam = map[layer][spotLoopList[spot]]
    let middleTeam2 = map[layer][spotLoopList[spot + 1]]
    let leftTeam2 = map[layer][spotLoopList[spot + 2]]

    if (leftTeam1 !== 0 && leftTeam1 === selfTeam && selfTeam === middleTeam1) {
      wallList[playing-1].push([
        `${layer}-${spotLoopList[spot - 2]}-${map[layer][spotLoopList[spot - 2]]}`,
        `${layer}-${spotLoopList[spot - 1]}-${map[layer][spotLoopList[spot - 1]]}`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
      ]);
      console.log("wall found 3", wallList);
      foundNewWall = true;
    } 

    if (leftTeam2 !== 0 && leftTeam2 === selfTeam && selfTeam === middleTeam2) {
      wallList[playing-1].push([
        `${layer}-${spotLoopList[spot + 2]}-${map[layer][spotLoopList[spot + 2]]}`,
        `${layer}-${spotLoopList[spot + 1]}-${map[layer][spotLoopList[spot + 1]]}`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
      ]);
      console.log("wall found 4", wallList);
      foundNewWall = true;
    } 

  }
  return foundNewWall;
}

let gameState = 0;        //0 is pregame, 1 is midgame, 2 is endgame, 3 is game over
let preGameRounds = 9*2;  //amount of turns before the pregame is finished/amount of bricks per team can place before pregame is over
let playing = 1;          //what team is playing
let enemy = 2;
let newWall = false;
let brickList = [[],[]]

function App() {
  function gameMaster(brickDiv) {
    //controls the game

    function switchTurn() {
      if (playing === 1) {
        playing = 2;
        enemy = 1;
      } else {
        playing = 1;
        enemy = 2;
      }
    }

    if (gameState === 0) {
      //pregame
      if (newWall) {
        console.log(`team${playing} is removing`)
        //if a new wall is found:
        if ( //check that the player isnt removing their own brick
          brickDiv.target.id.split("-")[2] === playing.toString() ||
          brickDiv.target.id.split("-")[2] === "0"
        ) {
          console.log("cannot remove your own brick")
          return;
        }
        else {
          for(let wall of wallList[enemy - 1]) {
            if(wall.includes(brickDiv.target.id)) {
              console.log("cannot remove, is part of wall")
              return
            }
          }
          //if the player can remove brick, the next click event will turn brick to team 0 (unoccupied)
          console.log("removing brick",brickDiv.target.id);
          for(let i = 0; i < brickList[enemy - 1].length; i++) {
            if(brickList[enemy - 1][i] === brickDiv.target.id) {
              brickList[enemy - 1].splice(i,1)
            }
          }
          updateMapSpot(brickDiv, "0");
          newWall = false;
          switchTurn();
          return;
        }
      } else {
        console.log(`team${playing} is placing`)
        if(brickDiv.target.id.split("-")[2] !== "0") {
          return
        }
        let newMap = updateMapSpot(brickDiv, playing);
        let [layer,spot] = brickDiv.target.id.split("-")
        brickList[playing-1].push(`${layer}-${spot}-${playing}`)
        newWall = wallCheck(brickDiv, newMap);
        preGameRounds -= 1;
        if (preGameRounds === 0) {
          //when all 18 moves have been made switch to midgame
          gameState = 1;
          console.log("pregame over")
        }

      }
      if (!newWall) {
        //when turn ends, switch turn
        switchTurn();
      }
      else {  //if all enemy bricks are in walls, move on to next turn without removing any bricks
        if(wallList[enemy-1].length === 0) {
          return
        } 
        let clonedBrickList = [...brickList[enemy-1]]
        for(let brick of brickList[enemy-1]) {
          for(let wall of wallList[enemy-1]) {
            if(wall.includes(brick)) {
              console.log("brick:",brick,clonedBrickList)
              for(let i = 0; i < clonedBrickList.length; i++) {
                if(clonedBrickList[i] === brick) {
                  clonedBrickList.splice(i,1)
                }
              }
            }
          }
        }
        console.log(clonedBrickList)
        if(clonedBrickList.length === 0) {
          console.log("all enemy bricks are in walls, switching turns")
          switchTurn()
          newWall = false
        }
      }
    }
  }

  function updateMapSpot(e, team) {
    //used for pregame and mby endgame later
    let [layer, spot] = e.target.id.split("-");

    let newGameMap = [...gameMap];
    newGameMap[layer][spot] = team;
    //console.log("layer:",layer,"spot:",spot,gameMap)
    setGameMap(newGameMap);
    return newGameMap;
  }

  const [gameMap, setGameMap] = useState(generateMap(layerAmount));
  return (
    <div className="layersWrapper">
      <div className="line1" />
      <div className="line2" />

      {gameMap.map((layer, layerIndex) => {
        return (
          <div
            style={{
              position: "absolute",
              left: `calc(${(50 / gameMap.length) * layerIndex}% + 5% - 1px)`,
              top: `calc(${(50 / gameMap.length) * layerIndex}% + 5% - 1px)`,
              width: `calc(${
                100 - (100 / gameMap.length) * layerIndex
              }% - 10% - 1px)`,
              height: `calc(${
                100 - (100 / gameMap.length) * layerIndex
              }% - 10% - 1px)`,
              border: "2px solid #000",
              backgroundColor: layerIndex === gameMap.length - 1 ? "#fff" : "",
            }}
          >
            {layer.map((spot, index) => {
              let state = "#000";
              if (spot === 1) {
                state = "#ff0000";
              }
              if (spot === 2) {
                state = "#0000ff";
              }

              return (
                <div
                  style={{
                    position: "absolute",
                    zIndex: "100",
                    width: "20px",
                    height: "20px",
                    backgroundColor: state,
                    left: `calc(${spotSpots[index][0]} - 10.5px)`,
                    top: `calc(${spotSpots[index][1]} - 10px)`,
                  }}
                  onClick={(e) => {
                    gameMaster(e);
                  }}
                  id={`${layerIndex}-${index}-${spot}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
