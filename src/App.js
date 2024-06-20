import "./App.css";
import { useState } from "react";
//map states:
//0 => empty/unoccupied
//1 => white team
//2 => black team

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

let wallList = [[], []];
function wallCheck(brickDiv, map) {
  let [layer, spot] = brickDiv.target.id.split("-");
  let spotLoopList = [6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0]; //connects the list into circle

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
      wallList[playing - 1].push([
        `0-${spot}-${map[0][spot]}`,
        `1-${spot}-${map[1][spot]}`,
        `2-${spot}-${map[2][spot]}`,
      ]);
      foundNewWall = true;
    }
    spot = parseInt(spot) + 2;

    //checking same dimensional walls
    let leftTeam = map[layer][spotLoopList[spot - 1]];
    let selfTeam = map[layer][spotLoopList[spot]];
    let rightTeam = map[layer][spotLoopList[spot + 1]];

    if (leftTeam !== 0 && leftTeam === selfTeam && selfTeam === rightTeam) {
      wallList[playing - 1].push([
        `${layer}-${spotLoopList[spot - 1]}-${
          map[layer][spotLoopList[spot - 1]]
        }`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
        `${layer}-${spotLoopList[spot + 1]}-${
          map[layer][spotLoopList[spot + 1]]
        }`,
      ]);
      foundNewWall = true;
    }
  } else {
    spot = parseInt(spot) + 2;
    let leftTeam1 = map[layer][spotLoopList[spot - 2]];
    let middleTeam1 = map[layer][spotLoopList[spot - 1]];
    let selfTeam = map[layer][spotLoopList[spot]];
    let middleTeam2 = map[layer][spotLoopList[spot + 1]];
    let leftTeam2 = map[layer][spotLoopList[spot + 2]];

    if (leftTeam1 !== 0 && leftTeam1 === selfTeam && selfTeam === middleTeam1) {
      wallList[playing - 1].push([
        `${layer}-${spotLoopList[spot - 2]}-${
          map[layer][spotLoopList[spot - 2]]
        }`,
        `${layer}-${spotLoopList[spot - 1]}-${
          map[layer][spotLoopList[spot - 1]]
        }`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
      ]);
      foundNewWall = true;
    }

    if (leftTeam2 !== 0 && leftTeam2 === selfTeam && selfTeam === middleTeam2) {
      wallList[playing - 1].push([
        `${layer}-${spotLoopList[spot + 2]}-${
          map[layer][spotLoopList[spot + 2]]
        }`,
        `${layer}-${spotLoopList[spot + 1]}-${
          map[layer][spotLoopList[spot + 1]]
        }`,
        `${layer}-${spotLoopList[spot]}-${map[layer][spotLoopList[spot]]}`,
      ]);
      foundNewWall = true;
    }
  }
  if(foundNewWall) {
    console.log("wall formed, pick enemy brick to remove")
    for(let wall of wallList[enemy-1]) {
      for(let brick of wall) {
        console.log(brick)
        document.getElementById(brick).children[0].children[0].style.backgroundColor = "#808080"
      }
    }
  }
  return foundNewWall;
}

let gameState = 0; //0 is pregame, 1 is midgame, 2 is game over
let preGameRounds = 9 * 2; //amount of turns before the pregame is finished/amount of bricks per team can place before pregame is over
let playing = 1; //what team is playing 1 = team1 and 2 = team2, 0 is used to represent empty space so we do not use that value for this variable
let enemy = 2;  //what team is waiting for their turn
let newWall = false;  //has a new wall been found?
let brickList = [[], []]; //list of all bricks on board per team
let possibleMoves = undefined

let currentBrick = undefined
let currentBrickDiv = undefined
let gotoBrick = undefined

function App() {
  const [reactPlaying,setPlaying] = useState(playing)
  function gameMaster(brickDiv) {  //controls the game
    function switchTurn() {
      if (playing === 1) {
        playing = 2;
        enemy = 1;
      } else {
        playing = 1;
        enemy = 2;
      }
      setPlaying(playing)
    }
    if (newWall) {
      console.log(`team${playing} is removing`);
      //if a new wall is found:
      if (
        //check that the player isnt removing their own brick
        brickDiv.target.id.split("-")[2] === playing.toString() ||
        brickDiv.target.id.split("-")[2] === "0"
      ) {
        console.log("can only remove enemy team bricks");
        return;
      } else {
        for (let wall of wallList[enemy - 1]) {
          if (wall.includes(brickDiv.target.id)) {
            console.log("cannot remove, is part of wall");
            return;
          }
        }
        //if the player can remove brick, the next click event will turn brick to team 0 (unoccupied)
        console.log("removing brick", brickDiv.target.id);
        for (let i = 0; i < brickList[enemy - 1].length; i++) {
          if (brickList[enemy - 1][i] === brickDiv.target.id) {
            brickList[enemy - 1].splice(i, 1);
          }
        }
        if(brickList[enemy-1].length < 3 && gameState === 1) {
          gameState = 2
          console.log(`game over, team${playing} won the game`)
        }

        updateMapSpot(brickDiv, 0);
        newWall = false;
        for(let wall of wallList[enemy-1]) {
          for(let brick of wall) {
            
            if(enemy === 1) {
              document.getElementById(brick).children[0].children[0].style.backgroundColor = "#fff"
            }
            else {
              document.getElementById(brick).children[0].children[0].style.backgroundColor = "#000"
            }
          }
        }
        switchTurn();
        return;
      }
    }

    if (gameState === 0) {
      //pregame
      console.log(`team${playing} is placing`);
      if (brickDiv.target.id.split("-")[2] !== "0") {
        console.log("spot is occupied, cannot place brick");
        return;
      }
      let newMap = updateMapSpot(brickDiv, playing);
      let [layer, spot] = brickDiv.target.id.split("-");
      brickList[playing - 1].push(`${layer}-${spot}-${playing}`);
      newWall = wallCheck(brickDiv, newMap);
      preGameRounds -= 1;
      if (preGameRounds === 0) {
        //when all 18 moves have been made switch to midgame
        gameState = 1;
        console.log("pregame over");
        if(!newWall) {
          switchTurn()
        }
        else {
        }
        return
      }
    }
    
    if(gameState === 1) { //midgame
      let endgame = false
      //endgame
      if(brickList[playing-1].length < 4) {
        endgame = true
      }

      if(currentBrick === undefined) {
        if(brickDiv.target.id.split("-")[2] !== playing.toString()) {
          console.log(`team${playing} must click a brick on your team`)
          if(enemy === 1) {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#ff4747"
          }
          else {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#8b0000"
          }

          setTimeout(() => {
            if(enemy === 1) {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
            }
            else {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#000"
            }
          },300)
          return
        }
        currentBrick = brickDiv.target.id
        currentBrickDiv = brickDiv
        possibleMoves = possibleMovesGen(currentBrick)
        if(possibleMoves.length === 0 && !endgame) {
          currentBrick = undefined
          currentBrickDiv = undefined
          console.log("brick has no possible moves")

          if(playing === 1) {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#ff4747"
          }
          else {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#8b0000"
          }

          setTimeout(() => {
            if(playing === 1) {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
            }
            else {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#000"
            }
          },300)

          return
        }
        console.log(`team${playing} is moving ${currentBrick}`);
        if(playing === 1) {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#fffcb3"
        }
        else {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#7a7a48"
        }
        return
      }

      if(brickDiv.target.id === currentBrick) {
        currentBrick = undefined
        currentBrickDiv = undefined
        console.log("cancelled move")
        if(playing === 1) {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
        }
        else {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#000"
        }
        return
      }
      
      if(currentBrick.split("-")[2] === brickDiv.target.id.split("-")[2]) {
        let testMoves = possibleMovesGen(brickDiv.target.id)
        if(testMoves.length === 0 && !endgame) {
          console.log("brick has no possible moves")

          if(playing === 1) {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#ff4747"
          }
          else {
            brickDiv.target.children[0].children[0].style.backgroundColor = "#8b0000"
          }

          setTimeout(() => {
            if(playing === 1) {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
            }
            else {
              brickDiv.target.children[0].children[0].style.backgroundColor = "#000"
            }
          },300)
          return
        }
        console.log("changing move target")
        if(playing === 1) {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#fffcb3"
        }
        else {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#7a7a48"
        }

        if(playing === 1) {
          currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
        }
        else {
          currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#000"
        }
        currentBrick = brickDiv.target.id
        currentBrickDiv = brickDiv
        possibleMoves = possibleMovesGen(currentBrick)
        return
      }

      if(brickDiv.target.id.split("-")[2] !== "0") {
        console.log("spot is not unoccupied, cannot move there")
        return
      }

      gotoBrick = brickDiv.target.id
      let moveSuccess = false
      let newMap = undefined

      if(!endgame) {
        let moveResult = moveBrick(currentBrick,gotoBrick,possibleMoves) 
        moveSuccess = moveResult[0]
        newMap = moveResult[1]
      }
      else {
        moveSuccess = true
        newMap = endgameMoveBrick(currentBrick,gotoBrick)
      }

      if(moveSuccess) {
        if(playing === 1) {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#fff"
        }
        else {
          brickDiv.target.children[0].children[0].style.backgroundColor = "#000"
        }
        console.log("to",gotoBrick)
        for(let i in brickList[playing-1]) {
          if(brickList[playing-1][i] === currentBrick) {
            brickList[playing-1].splice(i,1)
            brickList[playing-1].push(`${gotoBrick.split("-")[0]}-${gotoBrick.split("-")[1]}-${playing}`)
          }
        }


        for(let i in wallList[playing-1]) {
          if(wallList[playing-1][i].includes(currentBrick)) {
            console.log("wall broken",wallList[playing-1][i])

            let brokenWall = wallList[playing-1].splice(i,1)
            for(let brick of brokenWall[0]) {
              let inOtherWall = false
              for(let wall of wallList[playing-1]) {
                if(wall.includes(brick)) {
                  inOtherWall = true
                  break
                }
              }

              if(!inOtherWall) {
                console.log(document.getElementById(brick))
                document.getElementById(brick).children[0].className = "brick"
              }
            }
          }
        }

        newWall = wallCheck(brickDiv,newMap)
        currentBrick = undefined
        currentBrickDiv = undefined

        if(!endgame) {
          let hasAPossibleMove = false
          for (let brick of brickList[enemy-1]) {
            if(possibleMovesGen(brick).length !== 0) {
              hasAPossibleMove = true
              break
            }
          }
          if(!hasAPossibleMove) {
            console.log(`team${enemy} has no possible moves, team${playing} plays again`)
            return
          }
        }
      }
      else {
        console.log("cannot move there, try again")
        if(playing === 1) {
          currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#ff4747"
        }
        else {
          currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#8b0000"
        }

        setTimeout(() => {
          if(playing === 1) {
            currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#fffcb3"
          }
          else {
            currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#7a7a48"
          }

          setTimeout(() => {
            if(playing === 1) {
              currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#ff4747"
            }
            else {
              currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#8b0000"
            }

            setTimeout(() => {
              if(playing === 1) {
                currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#fffcb3"
              }
              else {
                currentBrickDiv.target.children[0].children[0].style.backgroundColor = "#7a7a48"
              }
            },300)
          },200)
        },300)

        
        return
      }
    }

    if (!newWall) {
      //when turn ends, switch turn
      switchTurn();
    } else {
      for(let brick of wallList[playing-1][wallList[playing-1].length-1]) {
        if(document.getElementById(brick) === null) {
          document.getElementById(`${brick.split("-")[0]}-${brick.split("-")[1]}-0`).children[0].className = "walled"
        }
        else {
          document.getElementById(brick).children[0].className = "walled"
        }
      }
      //if all enemy bricks are in walls, move on to next turn without removing any bricks
      if (wallList[enemy - 1].length === 0) {
        return;
      }
      let clonedBrickList = [...brickList[enemy - 1]];
      for (let brick of brickList[enemy - 1]) {
        for (let wall of wallList[enemy - 1]) {
          if (wall.includes(brick)) {
            for (let i = 0; i < clonedBrickList.length; i++) {
              if (clonedBrickList[i] === brick) {
                clonedBrickList.splice(i, 1);
              }
            }
          }
        }
      }
      if (clonedBrickList.length === 0) {
        console.log("all enemy bricks are in walls, switching turns");
        for(let wall of wallList[enemy-1]) {
          for(let brick of wall) {
            if(enemy === 1) {
              document.getElementById(brick).children[0].children[0].style.backgroundColor = "#fff"
            }
            else {
              document.getElementById(brick).children[0].children[0].style.backgroundColor = "#000"
            }
          }
        }
        switchTurn();
        newWall = false;
      }
    }
  }

  function endgameMoveBrick(current,goto) {
    let [x1,y1,team] = current.split("-")
    let [x2,y2] = goto.split("-")

    let newGameMap = [...gameMap]
    newGameMap[x1][y1] = 0
    newGameMap[x2][y2] = parseInt(team)
    setGameMap(newGameMap)
    return newGameMap
  }

  function possibleMovesGen(current) {
    let [x1,y1] = current.split("-")

    let layerMoveLoop = [1,0,1,2,1]
    let spotMoveLoop = [7,0,1,2,3,4,5,6,7,0]

    let possibleMovements = []
    x1 = parseInt(x1)
    y1 = parseInt(y1)
    if(y1 % 2 === 1) {  //may be a bug here somewhere
      if(gameMap[layerMoveLoop[x1+2]][spotMoveLoop[y1+1]] === 0) {
        possibleMovements.push(`${layerMoveLoop[x1+2]}-${spotMoveLoop[y1+1]}-0`)
      }
      if(gameMap[layerMoveLoop[x1]][spotMoveLoop[y1+1]] === 0) {
        possibleMovements.push(`${layerMoveLoop[x1]}-${spotMoveLoop[y1+1]}-0`)
      }
    }

    if(gameMap[layerMoveLoop[x1+1]][spotMoveLoop[y1+2]] === 0) {
      possibleMovements.push(`${layerMoveLoop[x1+1]}-${spotMoveLoop[y1+2]}-0`)
    }
    if(gameMap[layerMoveLoop[x1+1]][spotMoveLoop[y1]] === 0) {
      possibleMovements.push(`${layerMoveLoop[x1+1]}-${spotMoveLoop[y1]}-0`)
    }
    return possibleMovements
  }

  function moveBrick(current,goto,possibleMovements) {
    let [x1,y1,team] = current.split("-")
    let [x2,y2] = goto.split("-")

    if(possibleMovements.includes(goto)) {
      let newGameMap = [...gameMap]
      newGameMap[x1][y1] = 0
      newGameMap[x2][y2] = parseInt(team)
      setGameMap(newGameMap)
      return [true,newGameMap]
    }
    else {
      return [false,gameMap]
    }
  }

  function updateMapSpot(e, team) {
    //used for pregame
    let [layer, spot] = e.target.id.split("-");

    let newGameMap = [...gameMap];
    newGameMap[layer][spot] = team;
    setGameMap(newGameMap);
    return newGameMap;
  }

  const [gameMap, setGameMap] = useState(generateMap(layerAmount));
  return (
    <div className="layersWrapper">
      <div className="line1" style={{backgroundColor:(reactPlaying === 1 ? "#000":"#fff")}}/>
      <div className="line2" style={{backgroundColor:(reactPlaying === 1 ? "#000":"#fff")}}/>
      <div className="line3" style={{backgroundColor:(reactPlaying === 1 ? "#000":"#fff")}}/>
      <div className="line4" style={{backgroundColor:(reactPlaying === 1 ? "#000":"#fff")}}/>

      {gameMap.map((layer, layerIndex) => {
        return (
          <div
          style={{
              transition:"0.2s",
              position: "absolute",
              left: `calc(${(50 / gameMap.length) * layerIndex}% + 5% - 3px)`,
              top: `calc(${(50 / gameMap.length) * layerIndex}% + 5% - 3px)`,
              width: `calc(${
                100 - (100 / gameMap.length) * layerIndex
              }% - 10% - 1px)`,
              height: `calc(${
                100 - (100 / gameMap.length) * layerIndex
              }% - 10% - 1px)`,
              border: `6px solid ${reactPlaying === 1 ? "#000":"#fff"}`,
            }}
            >
            {layer.map((spot, index) => {
              return (
                <div
                  style={{
                    transition:"0.2s",
                    position: "absolute",
                    zIndex: "100",
                    width: "60px",
                    height: "60px",
                    backgroundColor: reactPlaying === 1 ? "#bfbfbf" : "#404040",
                    left: `calc(${spotSpots[index][0]} - 30px)`,
                    top: `calc(${spotSpots[index][1]} - 31px)`,
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:"8px",
                  }}
                  onClick={(e) => {
                    gameMaster(e);
                  }}
                  id={`${layerIndex}-${index}-${spot}`}
                  >
                    <div className="brick" style={{
                      opacity:(spot === 0 ? "0":"1"),
                      backgroundColor:(spot === 1 ? "#000":"#fff")
                      
                    }}>
                      <div className="innerBrick" style={{
                        backgroundColor:(spot === 2 ? "#000":"#fff")
                      }}>

                      </div>
                    </div>
                  </div>
                  
              );
            })}
          </div>
        );
      })}
      <div className="backgroundGradient" style={{left:(reactPlaying === 1 ? "0":"-200vw")}}/>
    </div>
  );
}

export default App;
