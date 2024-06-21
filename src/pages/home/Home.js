import React from "react";
import { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [local1, setLocal1] = useState(false);
  const [local2, setLocal2] = useState(false);
  const [howto, sethowto] = useState(false);

  function handleButtonPress(index) {
    if (index === 0) {
      //open local menu
      if (local1 === true) {
        setLocal1(false);
      } else {
        setLocal1(true);
      }
      sethowto(false);
    }
    if (index === 1) {
      //opens bot difficulty menu
      setLocal2(true);
    }
    if (index === 2) {
      if (howto === true) {
        sethowto(false);
      } else {
        sethowto(true);
      }
      //opens multiplayer menu
      setLocal1(false);
      setLocal2(false);
    }
  }

  return (
    <div className="homeWrapper">
      <div className="homeTitle">
        <div>
          <div className="innerBrick" />
        </div>
        <h1>
          cic mic
          <br />
          <span>an albanian board game</span>
        </h1>
      </div>
      <div className="homeLocalWrapper">
        <button
          onClick={() => {
            handleButtonPress(0);
          }}
        >
          Play local
        </button>
        <div
          className="homeOptions opt1"
          style={{ display: local1 ? "flex" : "none" }}
        >
          <div className="homeOptionsLine" />
          <button
            onClick={() => {
              window.open("./local", "_self");
            }}
          >
            VS human
          </button>
          <button
            onClick={() => {
              handleButtonPress(1);
            }}
          >
            VS bot (COMING SOON)
          </button>
          <div
            className="homeOptions opt2"
            style={{ display: local2 ? "flex" : "none" }}
          >
            <div className="homeOptionsLine" />
            <button onClick={() => {}}>Godly</button>
            <button onClick={() => {}}>Master</button>
            <button onClick={() => {}}>Challenger</button>
            <button onClick={() => {}}>Novice</button>
            <button onClick={() => {}}>Beginner</button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          /*window.open("/multiplayer","_self")*/
        }}
      >
        Play multiplayer (COMING SOON)
      </button>
      <button
        onClick={() => {
          handleButtonPress(2);
        }}
      >
        How to play
      </button>
      <div className="howTo" style={{ display: howto ? "flex" : "none" }}>
        <h1>how to play cic mic, an albanian board game</h1>
        <h2>general rules (rules that apply at all times):</h2>
        <p>
          <strong>1.</strong> if a player gets 3 bricks in a straight horizontal
          or vertical line, they make what is called a wall. Once a player has
          made a wall, they can remove one of the other players bricks from the
          board before their turn ends
        </p>
        <p>
          <strong>2.</strong> a brick that is part of a wall is considered
          "walled" and cannot be removed from the board so long as it stays
          "walled"
        </p>
        <p>
          <strong>3.</strong> if a brick that is part of a wall is moved such
          that the wall is no longer formed, it and the other bricks that made
          up the wall are no longer "walled"
        </p>
        <p>
          <strong>4.</strong> a brick can only be placed or moved on an
          unoccupied spot
        </p>
        <p>
          <strong>5.</strong> if you've formed a wall, but all enemy bricks are
          walled. The game will proceed without removing a brick from the enemy
        </p>

        <h2>gameplay:</h2>
        <p>
          the gameplay consist of 3 phrases and{" "}
          <span>all the general rules apply to all phases</span>
        </p>
        <h3>pregame:</h3>
        <p>
          players take turn placing one of their 9 total reserve bricks onto the
          board
        </p>
        <p> once 18 bricks total are on the board, the midgame phase begins</p>
        <h3>midgame:</h3>
        <p>
          players must now choose a brick to move and may only move it to a
          connected spot on the map (only moved to where the paths lead)
        </p>
        <p>
          {" "}
          a brick can only be moved one spot at a time, and moving a brick takes
          a turn.
        </p>
        <p>
          For players in the midgame phase, a new rule applies:
          <br />
          <strong>6.</strong> if all your bricks have no possible moves, your
          turn is skipped
        </p>
        <h3>endgame:</h3>
        <p>
          a player who has only 3 bricks left on the board will enter the
          endgame phase
        </p>
        <p>
          they can move their bricks anywhere that is unoccupied on the map,
          this only applies to the player with 3 bricks left
        </p>
        <p>both players can be in the endgame phase at the same time</p>
        <h3>win condition:</h3>
        <p>
          to win the game you must get your <span>enemies</span> bricks on the
          board to less than 3
        </p>
        <p>
          that is to say, if you only have 2 bricks left on the board, you've
          lost the game
        </p>

        <h2>visual guidance and controls:</h2>
        <p>
          this section explains how to understand the state of the game from the
          visuals and to explain the controls.
        </p>
        <p>
          the games only method of controls is clicking/tapping bricks, this is
          to support mobile with minimal work, allow for easy and intutive
          controls and also to make the programming simpler. Dragging may be
          added into the game at a later time
        </p>
        <h3>background color:</h3>
        <p>
          the background will shift from white and black as you take turns. If
          the background is white, that means that its team white's turn to
          play, and if its black, that means its team black's turn to play
        </p>
        <h3>selecting a brick to move:</h3>
        <p>
          in the midgame phase, you will have to move bricks around the map. To
          select the brick you'd like to move, simply click a brick on your
          team. The bricks inner color will tell you if you are able to move it.{" "}
        </p>
        <h4>brick blinked red:</h4>
        <p>
          if the bricks inner color blinked red, that means that the brick has
          no possible moves, and you need to select another brick
        </p>
        <h4>brick turns yellow:</h4>
        <p>
          if the bricks inner color turns yellow, that means that it is possible
          to move the brick. Simply click a neighboring spot that is unoccupied
          to move it to that spot
        </p>
        <h4>brick turns yellow, but blinked red twice:</h4>
        <p>
          this only happens in the midgame phase and if you've selected a brick
          that has atleast one possible move, but the spot you tried to move it
          to was not one of them. Remember to only select a{" "}
          <span>neighboring spot</span> that is unoccupied
        </p>
        <h4>enemies walled bricks turns grey:</h4>
        <p>
          this happens when you've formed a wall, and it helps you see which
          bricks cannot be removed. As stated in <span>rule 2</span>
        </p>

        <h1>thank you for playing!</h1>
      </div>
    </div>
  );
};

export default Home;
